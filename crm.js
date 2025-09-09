import React from 'react';
import hexToRGBA from '../hexToRGBA';
import { Link } from 'react-router-dom';

const updateAddNewLabels = (event) => {
  // Dynamically change text field labels based on type
  let labels = [
    { accounts: 'Name', contacts: 'Name', opportunities: 'Name' },
    {
      accounts: 'Rep',
      contacts: 'Email',
      opportunities: 'Contact',
    },
    {
      accounts: 'Territory',
      contacts: 'Phone #',
      opportunities: 'ARR',
    },
  ];

  let selectedValue =
    event?.target?.value ||
    document.getElementById('add-new-select-type').nextElementSibling.value;

  labels.forEach((d, i) => {
    // Label text
    document.getElementById(`add-new-text-field-${i}-label`).innerText =
      labels[i][selectedValue];
    // Child span that sets width of text when focused
    document.getElementById(
      `add-new-text-field-${i}`
    ).nextElementSibling.children[0].children[0].innerText =
      labels[i][selectedValue];
    // Input name attribute
    document.getElementById(`add-new-text-field-${i}`).name =
      labels[i][selectedValue];
  });
};

let urlParams = new URLSearchParams(document.location.search);
let role = urlParams.get('role');
let displayAddNew = role === 'partner' ? false : true;

export default {
  styles: {
    display: 'flex',
  },
  opts: {},
  id: '',
  classes: '',
  favicon: '/crm/logos/main.ico',
  pendoConfig: {
    name: 'crm',
    apiKey: '74924fb4-e18c-42b1-664b-47ed918c3a45',
    additionalApiKeys: [
      '758434d6-672f-4326-4db4-64412a4af191', // Pendo Experience Sandbox
      'bada3d2f-3371-418a-6711-c9ed5af6d466', // Pendo - Onboarding
      '9a491f59-cc46-43e2-4c67-179d36c5d03b', // Pendo Free Sample Data (US prod)
      'b2cb409b-391e-4505-71ef-f35a6ba59b9f', // (Demo) Digital Adoption - SFDC
      'aafdb96f-d3f0-4704-59a1-912a146e228c', // sr$2A - d44B! (Custom Demo Sub)
      '2cc344b8-fe3e-4a29-490d-2a7b69e33f10', // Customer Education - SalesCRM app
      //'9285e427-0faf-4fd6-7dc9-d2906f67d1f2', // PS sub - ask MikeFo if questions
    ],
    snippetCallback: function (config, urlParams) {
      if (!urlParams.get('apiKey')) {
        // Zendesk widget script
        const script = document.createElement('script');
        script.id = 'ze-snippet';
        script.src =
          'https://static.zdassets.com/ekr/snippet.js?key=a20fee30-d89a-4466-b057-1435a63b8b56';
        document.head.appendChild(script);
      }
    },
    visitor: {
      acmeVersion: 3,
    },
    location: {
      transforms: [
        {
          attr: 'search',
          action: 'ExcludeKeys',
          data: [
            'obj',
            'disablePendo',
            'apiKey',
            'visitor',
            'account',
            'accountBasedVisitor',
            'role',
            'team',
            'title',
            'region',
            'office',
            'system',
          ],
        },
      ],
    },
  },
  background: {
    styles: {
      backgroundImage: 'url("/common/images/header-bg.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '105% 300px',
    },
    opts: {},
    id: '',
    classes: '',
  },
  header: {
    styles: {},
    opts: {},
    id: 'header',
    classes: '',
    navBar: {
      styles: {},
      opts: {},
      id: '',
      classes: '',
      contents: [
        {
          styles: {},
          opts: {},
          id: 'crm-title',
          classes: '',
          componentName: 'NavTitle',
          alignment: 'left',
          name: 'CRM',
        },
        {
          styles: {},
          opts: {},
          id: 'help-button',
          classes: '',
          componentName: 'Button',
          alignment: 'right',
          type: 'Link',
          icon: 'ContactSupport',
          tooltipText: 'Go to Help Center',
          href: 'https://support.pendo.io/hc/en-us',
          target: '_blank',
        },
        {
          styles: {},
          opts: {},
          id: 'profile-button',
          classes: 'profile-button',
          componentName: 'NavAvatar',
          alignment: 'right',
        },
      ],
      navItems: [
        {
          name: 'Dashboard',
          type: 'route',
          path: '/',
        },
        {
          name: 'Accounts',
          type: 'route',
          path: '/accounts',
        },
        {
          name: 'Contacts',
          type: 'route',
          path: '/contacts',
        },
        {
          name: 'Opportunities',
          type: 'route',
          path: '/opportunities',
        },
        {
          name: 'Mobile',
          type: 'custom',
          callback: () => {
            const publicKey = 'ag_du26vezngjhdorkluj4rw3xv4q';
            const osVersion = '16.2';
            const device = 'iphone14pro';
            const deviceColor = 'black';
            const scale = 75;

            window.open(
              `https://appetize.io/app/${publicKey}?osVersion=${osVersion}&device=${device}&deviceColor=${deviceColor}&scale=${scale}&params={"visitorId":"${pendo.visitorId}","accountId":"${pendo.accountId}"}`,
              '_blank'
            );
          },
        },
      ],
    },
    appBars: [
      {
        styles: {},
        opts: {},
        id: '',
        classes: '',
        contents: [
          {
            styles: {},
            opts: {},
            id: 'search-bar',
            componentName: 'NavSearch',
            alignment: 'left',
          },
          {
            // passing in optional property that controls if button is visible
            displayIndicator: displayAddNew,
            styles: {
              backgroundColor: '#1DA259',
              '&:hover': {
                backgroundColor: '#1a9150',
              },
            },
            opts: {
              variant: 'contained',
            },
            id: 'add-new',
            classes: '',
            componentName: 'Button',
            alignment: 'right',
            type: 'Modal',
            name: 'Add New',
            openStartCallback: () => {
              // Set dynamic labels for add new form before it is rendered
              updateAddNewLabels();
              // Add '/new' to url using pendo location api when add new form open
              let baseUrl = pendo.location.getHref();
              baseUrl = baseUrl.split('?');
              pendo.location.setUrl(
                baseUrl[0].slice(-1) === '/'
                  ? `${baseUrl[0]}new`
                  : `${baseUrl[0]}/new`
              );
            },
            closeEndCallback: () => {
              // Return to using browser url on form closed
              pendo.location.useBrowserUrl();
            },
            header: {
              styles: {},
              opts: {},
              id: '',
              classes: '',
              name: 'Add New',
            },
            content: {
              styles: {},
              opts: {},
              id: '',
              classes: '',
              componentName: 'Form',
              contents: [
                {
                  styles: {},
                  opts: {},
                  id: 'add-new-select-type',
                  classes: '',
                  componentName: 'Select',
                  label: 'Type',
                  options: [
                    {
                      name: 'Account',
                      value: 'accounts',
                    },
                    {
                      name: 'Contact',
                      value: 'contacts',
                    },
                    {
                      name: 'Opportunity',
                      value: 'opportunities',
                    },
                  ],
                  default: () => {
                    // Dynamically assign default based on path
                    return (
                      window.location.pathname.split('/')[1] || 'opportunities'
                    );
                  },
                  changeEndCallback: updateAddNewLabels, // Update dynamic add new form labels on select change
                },
                {
                  styles: {},
                  opts: {},
                  id: 'add-new-text-field-0',
                  classes: '',
                  componentName: 'TextField',
                  label: 'Default',
                },
                {
                  styles: {},
                  opts: {},
                  id: 'add-new-text-field-1',
                  classes: '',
                  componentName: 'TextField',
                  label: 'Default',
                },
                {
                  styles: {},
                  opts: {},
                  id: 'add-new-text-field-2',
                  classes: '',
                  componentName: 'TextField',
                  label: 'Default',
                },
              ],
              submitCallback: function (event, navigate) {
                // Get details from DOM and use to navigate to new details page
                let url = `/${
                  document.getElementById('add-new-select-type')
                    .nextElementSibling.value
                }/new/details?obj={`;

                // Store form fields as query params
                for (let i = 0; i < 3; i++) {
                  let el = document.getElementById(`add-new-text-field-${i}`);
                  url += `${i ? ',' : ''}"${encodeURIComponent(
                    el.name
                  )}":"${encodeURIComponent(el.value)}"`;
                }
                navigate(`${url}}`);
              },
            },
          },
        ],
      },
    ],
  },
  content: {
    styles: {},
    opts: {},
    id: '',
    classes: '',
    routes: [
      {
        name: 'Dashboard',
        route: '/',
        contents: [
          {
            styles: {},
            opts: {
              container: true,
            },
            id: '',
            classes: '',
            componentName: 'Grid',
            contents: [
              {
                styles: {},
                opts: {
                  item: true,
                  xs: 12,
                  lg: 8,
                },
                id: '',
                classes: '',
                componentName: 'Grid',
                contents: [
                  {
                    styles: {},
                    opts: {
                      container: true,
                    },
                    id: '',
                    classes: '',
                    componentName: 'Grid',
                    contents: [
                      {
                        styles: {},
                        opts: {
                          item: true,
                          xs: 12,
                        },
                        id: '',
                        classes: '',
                        componentName: 'Grid',
                        contents: [
                          {
                            styles: {},
                            opts: {
                              height: 0.5,
                              header: {
                                styles: {},
                                opts: {},
                                id: '',
                                classes: '',
                                name: 'Forecast',
                              },
                              content: {
                                styles: {},
                                opts: {
                                  type: 'Line',
                                  data: {
                                    labels: [
                                      'Week 1',
                                      'Week 2',
                                      'Week 3',
                                      'Week 4',
                                      'Week 5',
                                      'Week 6',
                                      'Week 7',
                                      'Week 8',
                                      'Week 9',
                                      'Week 10',
                                      'Week 11',
                                      'Week 12',
                                    ],
                                    datasets: [
                                      {
                                        fill: true,

                                        label: 'Forecast in $',
                                        data: [
                                          45000, 98000, 147000, 265000, 467000,
                                          487000, 603000, 1020000, 1150000,
                                          1230000, 1640000, 2460000,
                                        ],
                                        backgroundColor: hexToRGBA(
                                          '#0d88e6',
                                          0.7
                                        ),
                                        borderColor: hexToRGBA('#0d88e6', 0.9),
                                        pointBackgroundColor: hexToRGBA(
                                          '#0d88e6',
                                          0.8
                                        ),
                                        pointBorderColor: hexToRGBA(
                                          '#0d88e6',
                                          1
                                        ),
                                      },
                                    ],
                                  },
                                  opts: {
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    plugins: {
                                      legend: {
                                        display: false,
                                      },
                                      tooltip: {
                                        callbacks: {
                                          label: function (context) {
                                            return (
                                              '$' + context.raw / 1000000 + 'm'
                                            );
                                          },
                                        },
                                      },
                                    },
                                    scales: {
                                      y: {
                                        ticks: {
                                          callback: function (value) {
                                            return '$' + value / 1000000 + 'm';
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                id: '',
                                classes: '',
                                type: 'Chart',
                                datatest: 'Forecast Widget',
                              },
                            },
                            id: 'forecast-card',
                            classes: '',
                            componentName: 'ContentTile',
                          },
                        ],
                      },
                      {
                        styles: {},
                        opts: { item: true, xs: 12, md: 6 },
                        id: '',
                        classes: '',
                        componentName: 'Grid',
                        contents: [
                          {
                            styles: {},
                            opts: {
                              height: 0.5,
                              header: {
                                styles: {},
                                opts: {},
                                id: '',
                                classes: '',
                                name: 'Quota Attainment',
                              },
                              content: {
                                datatest: 'quota_widget',
                                styles: {},
                                opts: {
                                  type: 'Bar',
                                  data: {
                                    labels: [
                                      'Mona',
                                      'Felix',
                                      'Jess',
                                      'Ravi',
                                      'Kam',
                                      'Walter',
                                    ],
                                    datasets: [
                                      {
                                        label: 'Attained',
                                        data: [
                                          30000, 135000, 47000, 25000, 56000,
                                          55000,
                                        ],
                                        backgroundColor: hexToRGBA(
                                          '#1DA259',
                                          0.7
                                        ),
                                        borderColor: hexToRGBA('#1DA259', 0.9),
                                        hoverBackgroundColor: hexToRGBA(
                                          '#1DA259',
                                          0.9
                                        ),
                                        hoverBorderColor: hexToRGBA(
                                          '#1DA259',
                                          1
                                        ),
                                      },
                                      {
                                        label: 'Remaining',
                                        data: [
                                          20000, 15000, 33000, 40000, 44000,
                                          65000,
                                        ],
                                        backgroundColor: hexToRGBA(
                                          '#ffc700',
                                          0.7
                                        ),
                                        borderColor: hexToRGBA('#ffc700', 0.9),
                                        hoverBackgroundColor: hexToRGBA(
                                          '#ffc700',
                                          0.9
                                        ),
                                        hoverBorderColor: hexToRGBA(
                                          '#ffc700',
                                          1
                                        ),
                                      },
                                    ],
                                  },
                                  opts: {
                                    maintainAspectRatio: false,
                                    plugins: {
                                      tooltip: {
                                        callbacks: {
                                          label: function (context) {
                                            return (
                                              '$' + context.raw / 1000 + 'k'
                                            );
                                          },
                                        },
                                      },
                                    },
                                    scales: {
                                      x: {
                                        stacked: true,
                                      },
                                      y: {
                                        stacked: true,
                                        ticks: {
                                          callback: function (value) {
                                            return '$' + value / 1000 + 'k';
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                id: '',
                                classes: '',
                                type: 'Chart',
                              },
                            },
                            id: 'quota-card',

                            classes: '',
                            componentName: 'ContentTile',
                          },
                        ],
                      },
                      {
                        styles: {},
                        opts: { item: true, xs: 12, md: 6 },
                        id: '',
                        classes: '',
                        componentName: 'Grid',
                        contents: [
                          {
                            styles: {},
                            opts: {
                              height: 0.5,
                              header: {
                                styles: {},
                                opts: {},
                                id: '',
                                classes: '',
                                name: 'Pipeline',
                              },
                              content: {
                                datatest: 'pipeline-widget',

                                styles: {},
                                opts: {
                                  type: 'Doughnut',
                                  data: {
                                    labels: [
                                      'Qual',
                                      'Sol Pres.',
                                      'Sol Acc.',
                                      'Proposal',
                                      'Pending',
                                    ],
                                    datasets: [
                                      {
                                        data: [300, 250, 200, 150, 100],
                                        backgroundColor: [
                                          hexToRGBA('#f1416c', 0.7),
                                          hexToRGBA('#7239ea', 0.7),
                                          hexToRGBA('#0d88e6', 0.7),
                                          hexToRGBA('#1DA259', 0.7),
                                          hexToRGBA('#ffc700', 0.7),
                                        ],
                                        borderColor: [
                                          hexToRGBA('#f1416c', 1),
                                          hexToRGBA('#7239ea', 1),
                                          hexToRGBA('#0d88e6', 1),
                                          hexToRGBA('#1DA259', 1),
                                          hexToRGBA('#ffc700', 1),
                                        ],
                                        hoverBackgroundColor: [
                                          hexToRGBA('#f1416c', 0.9),
                                          hexToRGBA('#7239ea', 0.9),
                                          hexToRGBA('#0d88e6', 0.9),
                                          hexToRGBA('#1DA259', 0.9),
                                          hexToRGBA('#ffc700', 0.9),
                                        ],
                                        borderWidth: 1,
                                      },
                                    ],
                                  },
                                  opts: {
                                    maintainAspectRatio: false,
                                  },
                                },
                                id: '',
                                classes: '',
                                type: 'Chart',
                              },
                            },
                            id: 'pipeline-card',
                            classes: '',
                            componentName: 'ContentTile',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                styles: {},
                opts: {
                  item: true,
                  xs: 12,
                  lg: 4,
                },
                id: '',
                classes: '',
                componentName: 'Grid',
                contents: [
                  {
                    styles: {},
                    opts: {
                      height: 1,
                      header: {
                        styles: {},
                        opts: {},
                        id: '',
                        classes: '',
                        name: 'Open Opportunities',
                      },
                      content: {
                        styles: {},
                        opts: {
                          dataUrl: '/crm/tableData/opportunities.json',
                          columns: [
                            {
                              field: 'name',
                              headerName: 'Name',
                              flex: 1,
                              renderCell: (params) => (
                                <a href={`/opportunities/${params.id}/details`}>
                                  {params.formattedValue}
                                </a>
                              ),
                            },
                            {
                              field: 'account',
                              headerName: 'Account',
                              flex: 1,
                            },
                          ],
                        },
                        id: '',
                        classes: '',
                        type: 'Table',
                      },
                    },
                    id: '',
                    classes: '',
                    componentName: 'ContentTile',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Accounts',
        route: '/accounts',
        contents: [
          {
            styles: {},
            opts: {
              container: true,
            },
            id: '',
            classes: '',
            componentName: 'Grid',
            contents: [
              {
                styles: {},
                opts: {
                  item: true,
                  xs: 12,
                },
                id: '',
                classes: '',
                componentName: 'Grid',
                contents: [
                  {
                    styles: {},
                    opts: {
                      height: 1,
                      header: {
                        styles: {},
                        opts: {},
                        id: '',
                        classes: '',
                        name: 'Accounts',
                      },
                      content: {
                        styles: {},
                        opts: {
                          dataUrl: '/crm/tableData/accounts.json',
                          columns: [
                            {
                              field: 'name',
                              headerName: 'Name',
                              renderCell: (params) => (
                                <Link to={`/accounts/${params.id}/details`}>
                                  {params.formattedValue}
                                </Link>
                              ),
                              flex: 1,
                            },
                            {
                              field: 'rep',
                              headerName: 'Rep',
                              flex: 1,
                            },
                            {
                              field: 'territory',
                              headerName: 'Territory',
                              flex: 1,
                            },
                            {
                              field: 'industry',
                              headerName: 'Industry',
                              flex: 1,
                            },
                            {
                              field: 'address',
                              headerName: 'Address',
                              flex: 3,
                            },
                          ],
                        },
                        id: '',
                        classes: '',
                        type: 'Table',
                      },
                    },
                    id: '',
                    classes: '',
                    componentName: 'ContentTile',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Contacts',
        route: '/contacts',
        contents: [
          {
            styles: {},
            opts: {
              container: true,
            },
            id: '',
            classes: '',
            componentName: 'Grid',
            contents: [
              {
                styles: {},
                opts: {
                  item: true,
                  xs: 12,
                },
                id: '',
                classes: '',
                componentName: 'Grid',
                contents: [
                  {
                    styles: {},
                    opts: {
                      height: 1,
                      header: {
                        styles: {},
                        opts: {},
                        id: '',
                        classes: '',
                        name: 'Contacts',
                      },
                      content: {
                        styles: {},
                        opts: {
                          dataUrl: '/crm/tableData/contacts.json',
                          columns: [
                            {
                              field: 'name',
                              headerName: 'Name',
                              flex: 1,
                              renderCell: (params) => (
                                <Link to={`/contacts/${params.id}/details`}>
                                  {params.formattedValue}
                                </Link>
                              ),
                            },
                            {
                              field: 'account',
                              headerName: 'Account',
                              flex: 1,
                            },
                            {
                              field: 'email',
                              headerName: 'Email',
                              flex: 1,
                            },
                            {
                              field: 'phone',
                              headerName: 'Phone',
                              flex: 1,
                            },
                            {
                              field: 'title',
                              headerName: 'Title',
                              flex: 1,
                            },
                          ],
                        },
                        id: '',
                        classes: '',
                        type: 'Table',
                      },
                    },
                    id: '',
                    classes: '',
                    componentName: 'ContentTile',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Opportunities',
        route: '/opportunities',
        contents: [
          {
            styles: {},
            opts: {
              container: true,
            },
            id: '',
            classes: '',
            componentName: 'Grid',
            contents: [
              {
                styles: {},
                opts: {
                  item: true,
                  xs: 12,
                },
                id: '',
                classes: '',
                componentName: 'Grid',
                contents: [
                  {
                    styles: {},
                    opts: {
                      height: 1,
                      header: {
                        styles: {},
                        opts: {},
                        id: '',
                        classes: '',
                        name: 'Opportunities',
                      },
                      content: {
                        styles: {},
                        opts: {
                          dataUrl: '/crm/tableData/opportunities.json',
                          columns: [
                            {
                              field: 'name',
                              headerName: 'Name',
                              flex: 1,
                              renderCell: (params) => (
                                <Link
                                  to={`/opportunities/${params.id}/details`}
                                >
                                  {params.formattedValue}
                                </Link>
                              ),
                            },
                            {
                              field: 'account',
                              headerName: 'Account',
                              flex: 1,
                            },
                            {
                              field: 'contact',
                              headerName: 'Contact',
                              flex: 1,
                            },
                            {
                              field: 'rep',
                              headerName: 'Rep',
                              flex: 1,
                            },
                            {
                              field: 'arr',
                              headerName: 'ARR',
                              flex: 1,
                            },
                          ],
                        },
                        id: '',
                        classes: '',
                        type: 'Table',
                      },
                    },
                    id: '',
                    classes: '',
                    componentName: 'ContentTile',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Details',
        route: '/:detailType/:detailId/details',
        contents: [
          {
            styles: {},
            opts: {
              container: true,
            },
            id: '',
            classes: '',
            componentName: 'Grid',
            contents: [
              {
                styles: {},
                opts: {
                  item: true,
                  xs: 12,
                  sm: 5,
                  md: 4,
                  lg: 3,
                },
                id: '',
                classes: '',
                componentName: 'Grid',
                contents: [
                  {
                    styles: {},
                    opts: {
                      height: 0.5,
                      header: {
                        styles: {},
                        opts: {},
                        id: '',
                        classes: '',
                        name: 'Quick Information',
                      },
                      content: {
                        styles: {},
                        opts: {
                          schema: {
                            accounts: ['name', 'rep', 'territory'],
                            contacts: ['name', 'email', 'phone'],
                            opportunities: ['name', 'contact', 'arr'],
                          },
                          baseUrl: '/crm/tableData/',
                          src: 'https://pendo-static-6591622502678528.storage.googleapis.com/aMWfxQOEkuJp4VuCXMEJQUBQIJ8/guide-media-cd1fdd27-4597-4af1-bb5b-e03bf2b75bc9',
                        },
                        id: '',
                        classes: '',
                        type: 'QuickInfo',
                      },
                    },
                    id: 'quick-info',
                    classes: '',
                    componentName: 'ContentTile',
                  },
                ],
              },
              {
                styles: {},
                opts: {
                  item: true,
                  xs: 12,
                  sm: 7,
                  md: 8,
                  lg: 9,
                },
                id: '',
                classes: '',
                componentName: 'Grid',
                contents: [
                  {
                    styles: {},
                    opts: {
                      height: 0.5,
                      header: {
                        styles: {},
                        opts: {},
                        id: '',
                        classes: '',
                        name: 'Activity Tracker',
                      },
                      content: {
                        styles: {},
                        opts: {
                          tabs: [
                            'New Note',
                            'Email',
                            'Call',
                            'Log Activity',
                            'Create Task',
                            'Schedule',
                          ],
                        },
                        id: '',
                        classes: '',
                        type: 'TabbedInput',
                      },
                    },
                    id: '',
                    classes: '',
                    componentName: 'ContentTile',
                  },
                ],
              },
              {
                styles: {},
                opts: {
                  item: true,
                  xs: 12,
                },
                id: '',
                classes: '',
                componentName: 'Grid',
                contents: [
                  {
                    styles: {},
                    opts: {
                      height: 0.5,
                      header: {
                        styles: {},
                        opts: {},
                        id: '',
                        classes: '',
                        name: 'Timeline',
                      },
                      content: {
                        styles: {},
                        opts: {
                          entries: [
                            {
                              icon: 'NoteAlt',
                              text: 'Waiting on approval from Jane (CEO) on SaaS approved vendor agreement, aiming for December 31, 2020 close date.',
                            },
                            {
                              icon: 'Email',
                              text: 'Sent follow up email to re-engage.',
                            },
                            {
                              icon: 'Phone',
                              text: 'Had a phone conversation discussing next steps.',
                            },
                            {
                              icon: 'Build',
                              text: 'Had a troubleshooting conversation with David, Sales Engineer. Resolved.',
                            },
                            {
                              icon: 'CheckBox',
                              text: 'Demo Complete.',
                            },
                            {
                              icon: 'CalendarToday',
                              text: 'Demo Scheduled November 15, 2020.',
                            },
                          ],
                        },
                        id: '',
                        classes: '',
                        type: 'Timeline',
                      },
                    },
                    id: '',
                    classes: '',
                    componentName: 'ContentTile',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  footer: {
    styles: {},
    opts: {},
    id: 'footer',
    classes: '',
    typography: {
      styles: {},
      opts: {},
      id: '',
      classes: '',
      icon: {
        styles: {
          color: '#0d88e6',
        },
        opts: {},
        id: '',
        classes: 'footer-icon',
      },
    },
  },
};

