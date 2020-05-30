import * as awsx from '@pulumi/awsx';
import * as k8s from '@pulumi/kubernetes';
import * as kx from '@pulumi/kubernetesx';
import * as pulumi from '@pulumi/pulumi';

const clusterStackRef = new pulumi.StackReference('prod');
const kubeconfig = clusterStackRef.getOutput('kubeconfig');
const k8sProvider = new k8s.Provider('prod', {
  kubeconfig: kubeconfig.apply(JSON.stringify),
});

const appName = 'readinglevel';
const repository = new awsx.ecr.Repository(appName);
const image = repository.buildAndPushImage('../');

const pod = new kx.PodBuilder({
  containers: [
    {
      image,
      ports: { http: 80 },
    },
  ],
});
const deployment = new kx.Deployment(
  appName,
  {
    metadata: {
      namespace: 'applications',
    },
    spec: pod.asDeploymentSpec({
      replicas: 2,
      strategy: { rollingUpdate: { maxUnavailable: 0 } },
    }),
  },
  { provider: k8sProvider }
);
const service = deployment.createService();

const pdb = new k8s.policy.v1beta1.PodDisruptionBudget(
  appName,
  {
    metadata: {
      namespace: 'applications',
    },
    spec: {
      maxUnavailable: 0,
      selector: deployment.spec.selector,
    },
  },
  { provider: k8sProvider }
);

const gateway = new k8s.apiextensions.CustomResource(
  appName,
  {
    apiVersion: 'networking.istio.io/v1alpha3',
    kind: 'Gateway',
    metadata: {
      namespace: deployment.metadata.namespace,
    },
    spec: {
      selector: {
        istio: 'ingressgateway',
      },
      servers: [
        {
          port: {
            number: 443,
            name: 'https',
            protocol: 'HTTP',
          },
          hosts: ['www.readlinglevel.app'],
        },
      ],
    },
  },
  { provider: k8sProvider }
);

const virtualService = new k8s.apiextensions.CustomResource(
  appName,
  {
    apiVersion: 'networking.istio.io/v1alpha3',
    kind: 'VirtualService',
    metadata: {
      namespace: deployment.metadata.namespace,
    },
    spec: {
      hosts: ['www.readlinglevel.app'],
      gateways: [gateway.metadata.name],
      http: [
        {
          match: [
            {
              uri: {
                prefix: '/',
              },
            },
          ],
          route: [
            {
              destination: {
                host: service.metadata.name,
              },
            },
          ],
        },
      ],
    },
  },
  { provider: k8sProvider }
);
