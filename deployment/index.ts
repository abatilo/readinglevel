import * as awsx from '@pulumi/awsx';
import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';

const clusterStackRef = new pulumi.StackReference('prod');
const kubeconfig = clusterStackRef.getOutput('kubeconfig');
const k8sProvider = new k8s.Provider('prod', {
  kubeconfig: kubeconfig.apply(JSON.stringify),
});

const appName = 'readinglevel';
const repository = new awsx.ecr.Repository(appName);
const image = repository.buildAndPushImage('../');

const appLabels = { app: appName };

const deployment = new k8s.apps.v1.Deployment(
  appName,
  {
    metadata: { labels: appLabels },
    spec: {
      strategy: {
        rollingUpdate: {
          maxUnavailable: 0,
        },
      },
      replicas: 2,
      selector: { matchLabels: appLabels },
      template: {
        metadata: { labels: appLabels },
        spec: {
          containers: [
            {
              name: appName,
              image,
              ports: [{ name: 'http', containerPort: 80 }],
            },
          ],
        },
      },
    },
  },
  { provider: k8sProvider }
);

const service = new k8s.core.v1.Service(
  appName,
  {
    metadata: { labels: appLabels },
    spec: {
      selector: appLabels,
      type: 'ClusterIP',
      ports: [
        {
          name: 'http',
          port: 80,
          targetPort: 80,
        },
      ],
    },
  },
  { provider: k8sProvider }
);

const ingressMiddleware = new k8s.apiextensions.CustomResource(appName, {
  apiVersion: 'traefik.containo.us/v1alpha1',
  kind: 'Middleware',
  metadata: {
    labels: appLabels,
  },
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
});

const ingressRoute = new k8s.apiextensions.CustomResource(appName, {
  apiVersion: 'traefik.containo.us/v1alpha1',
  kind: 'IngressRoute',
  metadata: {
    labels: appLabels,
  },
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
});
