# pe-demo-app

This application is a new demo web application using React.js and Material UI that can be configured to render different content based on subdomain. The current configurations available are:

- [crm.pendoexperience.io](https://crm.pendoexperience.io) - a mock CRM application to replace the original Acme CRM
- [investments.pendoexperience.io](https://investments.pendoexperience.io) - a new mock investor portal
- [rpp.pendoexperience.io](https://rpp.pendoexperience.io) - a dedicated Reseller Partner Program demo environment
- [a11y.pendoexperience.io](https://a11y.pendoexperience.io) - a dedicated a11y/accessibility demonstration site
- [mfa.pendoexperience.io](https://mfa.pendoexperience.io) - a test site for the Micro Frontend Architecture product team
- [ps.pendoexperience.io](https://ps.pendoexperience.io) - a test site for the Professional Services team
- [training.pendoexperience.io](https://training.pendoexperience.io) - a training app for the Customer Education team
- [japan.pendoexperience.io](https://japan.pendoexperience.io) - a localized version of AcmeCRM for the Japan team
- [insurance.pendoexperience.io](https://insurance.pendoexperience.io), [ehr.pendoexperience.io](https://ehr.pendoexperience.io), [hr.pendoexperience.io](https://hr.pendoexperience.io) - verticalized environments with guides at almost 1:1 with CRM

## Developing

#### Dependencies

In order to get the project up and running you will need:

- Node JS
- NPM

#### Cloning

To clone a local version of the project run:

```
git clone https://github.com/pendo-io/pe-demo-app.git
```

#### Installation

To install dependencies:

```
cd ./pe-demo-app
npm install
```

#### Development Build

To create a development build that updates on changes run:

```
npm run start:dev
```

#### Production Build

To create a production build to test before releasing to production run:

```
npm run build
```

followed by:

```
npm run start
```

#### Pushing to Staging & Production

To push to the GCP staging environment:

```
npm run deploy:staging
```

To push to the GCP production environment:

```
npm run deploy:prod
```

#### Adding New Custom Domains

Review [this document](https://docs.google.com/document/d/1Ct3lsWaLIv5B6rVRo-B-0d8G0BFAm3ughC8COdP-cxA/edit#heading=h.d975r4mi7qgj) for a step-by-step guide of adding a new demo application and configuring the DNS entries.

## Configuration Options

Each subdomain posesses it's own configuration file located in `~/src/configs`. These files export a JavaScript object containing all configuration information needed to create the application. The configuration hierarchy resembles the following:

```
{
    styles: {}, // Object containing camel cased style attributes. Optionally can be included at every level of the hierarchy.
    opts: {}, // Object containing camel cased React props. Optionally can be included at every level of the hierarchy.
    id: '', // String id attribute. Optionally can be included at every level of the hierarchy.
    classes: '', // String containing space separated class names to be used in addition to dynamic Material UI classes. Optionally can be included at every level of the hierarchy.
    background: {}, // Optional object detailing  container for background image.
    header: { // Required object detailing container for top aligned navigation and application tool bars.
        navBar: { // Required object detailing applications navigation bar.
            contents: [ // Required array of objects detailing supported components (NavTitle, Button, NavAvatar) to render in application bar. For full props required for a given component, see the PropTypes in the components file.
                {
                    componentName: 'NavTitle', // Supported component name as specified in code base.
                    alignment: 'left', // String 'left' or 'right' to indicate which container to place navBar/appBar component in.
                    name: 'CRM', // String to appear in NavTitle.
                },
            ],
        },
        appBars: [ // Required array of objects detailing application bars. Note: Array can be empty, which would result in no app bars being rendered.
            contents: [ // Required array of objects detailing supported components (NavSearch, Button) to render in application bar. For full props required for a given component, see the PropTypes in the components file.
            ],
        ],
    },
    content: {
        routes: [ // Required array of objects detailing routes present in application. While not currently enforced, this array should never be empty.
            {
                name: 'Dashboard', // Required string giving name of route as it should appear in nav menu/drawer and in page title.
                route: '/', // Required string giving path for current route.
                contents: [ // Required array of objects detailing components (Grid, ContentTile) used to build.content of current page. Note: Unlike navBar and appBar contents, these components can contain sub components which are rendered recursively. This allows the grids to be nested arbitrarily creating the desired application layout. For full props required for a given component, see the PropTypes in the components file.
                ],
            }
        ],
    }, // Required object detailing container of page contents.
    footer: {}, // Required container for bottom aligned footer text. Currently hardcoded for all projects.
}
```
