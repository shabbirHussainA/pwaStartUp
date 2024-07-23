module.exports=(targets)=>{
    talons.tap(({ App, Header, SearchBar }) => {
        App.useApp.wrapWith('@magento/experience-platform-connector');
        Header.useAccountMenu.wrapWith(
            '@magento/experience-platform-connector/src/wrappers/wrapUseAccountMenu'
        );
        SearchBar.useAutocomplete.wrapWith(
            '@magento/experience-platform-connector/src/wrappers/wrapUseAutocomplete'
        );
    })

}