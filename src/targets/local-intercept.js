module.exports = (targets) => {
  // custom static route
    targets.of("@magento/venia-ui").routes.tap((routes) => {
      routes.push({
        name: "MyGreetingRoute",
        pattern: "/submitForm",
        path: require.resolve("../components/GreetingPage/submitForm.js"),
      },
      {
        name: "MyGreetingRoute",
        pattern: "/FormList",
        path: require.resolve("../components/GreetingPage/FormList.js"),
      });
      return routes;
    });
  };
  