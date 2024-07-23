const { Targetables } = require('@magento/pwa-buildpack');

module.exports = (targets) => {
    targets.of('@magento/venia-ui').routes.tap((routes) => {
        routes.push({
            name: 'MyGreetingRoute',
            pattern: '/submitForm',
            path: require.resolve('../components/GreetingPage/submitForm.js'),
        },
        {
            name: 'MyGreetingRoute',
            pattern: '/FormList',
            path: require.resolve('../components/GreetingPage/FormList.js'),
        },
        {
            name: 'MyGreetingRoute',
            pattern: '/FormEdit/:id',
            path: require.resolve('../components/GreetingPage/UpdateForm.js'),
        },
        {
            name: 'MyGreetingRoute',
            pattern: '/View/:id',
            path: require.resolve('../components/GreetingPage/SingleForm.js'),
        });
        return routes;
    });

    const targetables = Targetables.using(targets);

    // Load the 'CreateAccount' component
    const createAccount = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CreateAccount/createAccount.js'
    );
    
    // 2. import the component that helps rendering CMS Blocks
    const MiddleName = createAccount.addImport(
      "MiddleName from '../../../../../../src/components/AccountField/middleName'"
  );

    // Insert the new field after the existing 'lastName' field
    createAccount.insertAfterJSX(
        '  <Field id="firstName"/>',  // This should match the existing JSX exactly
        `<${MiddleName} isRequired={isRequired } /> `
    );
};
