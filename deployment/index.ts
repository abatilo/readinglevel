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
    spec: pod.asDeploymentSpec({
      strategy: { rollingUpdate: { maxUnavailable: 0 } },
    }),
  },
  { provider: k8sProvider }
);
const service = deployment.createService();

const pdb = new k8s.policy.v1beta1.PodDisruptionBudget(
  appName,
  {
    spec: {
      maxUnavailable: 0,
      selector: deployment.spec.selector
    },
  },
  { provider: k8sProvider }
);

const ingressMiddleware = new k8s.apiextensions.CustomResource(
  appName,
  {
    apiVersion: 'traefik.containo.us/v1alpha1',
    kind: 'Middleware',
    metadata: {},
    spec: {
      headers: {
        forceSTSHeader: true,
        stsSeconds: 31536000,
        stsIncludeSubdomains: true,
        stsPreload: true,
        referrerPolicy: 'no-referrer-when-downgrade',
        contentTypeNosniff: true,
        contentSecurityPolicy: 'upgrade-insecure-requests',
        browserXssFilter: true,
        customFrameOptionsValue: 'SAMEORIGIN',
        customResponseHeaders: {
          'Feature-Policy':
            'geolocation none; midi none; notifications none; push none; sync-xhr none; microphone none; camera none; magnetometer none; gyroscope none; speaker self; vibrate none; fullscreen self; payment none;',
        },
      },
    },
  },
  { provider: k8sProvider }
);

const ingressRoute = new k8s.apiextensions.CustomResource(
  appName,
  {
    apiVersion: 'traefik.containo.us/v1alpha1',
    kind: 'IngressRoute',
    metadata: {},
    spec: {
      entryPoints: ['websecure'],
      routes: [
        {
          match: 'Host(`www.readinglevel.app`)',
          kind: 'Rule',
          middlewares: [
            {
              name: ingressMiddleware.metadata.name,
            },
          ],
          services: [
            {
              name: service.metadata.name,
              port: service.spec.ports[0].port,
            },
          ],
        },
      ],
    },
  },
  { provider: k8sProvider }
);
