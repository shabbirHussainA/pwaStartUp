import React, { Fragment, Suspense } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAccountInformationPage } from '../talons/AccountInformationPage/useAccountInformationPage.js';

import { useStyle } from '@magento/venia-ui/lib/classify.js';
import Button from '@magento/venia-ui/lib/components/Button';
import { Message } from '@magento/venia-ui/lib/components/Field';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import defaultClasses from './accountInformationPage.module.css';
import AccountInformationPageOperations from './accountInformationPage.gql.js';
// new method to import React.lazy()
const EditModal = React.lazy(() => import('./editModal'));

const AccountInformationPage = props => {
    const classes = useStyle(defaultClasses, props.classes);// getting all the classes from props and the default classes

    const talonProps = useAccountInformationPage({
        ...AccountInformationPageOperations
    }); // getting talonProps from the useAccountInformation

    const {
        handleCancel,
        formErrors,
        handleChangePassword,
        handleSubmit,
        initialValues,
        isDisabled,
        isUpdateMode,
        loadDataError,
        shouldShowNewPassword,
        showUpdateMode,
        recaptchaWidgetProps
    } = talonProps;
    const { formatMessage } = useIntl();
    // displaying errorMessage 
    const errorMessage = loadDataError ? (
        <Message>
            <FormattedMessage
                id={'accountInformationPage.errorTryAgain'}
                defaultMessage={
                    'Something went wrong. Please refresh and try again.'
                }
            />
        </Message>
    ) : null;

    let pageContent = null;
    if (!initialValues) {
        return fullPageLoadingIndicator;
    } else {
        // customer is getting from the json 
        const { customer } = initialValues;
        console.log(customer)
        const customerName = `${customer.firstname} ${customer.custom_cust_attribute}`;
        const passwordValue = '***********';

        pageContent = (
            <Fragment>
                <div className={classes.accountDetails}>
                    <div className={classes.lineItemsContainer}>
                        <span className={classes.nameLabel}>
                            <FormattedMessage
                                id={'global.name'}
                                defaultMessage={'Name'}
                            />
                        </span>
                        <span className={classes.nameValue}>
                            {customerName}
                        </span>
                        <span className={classes.emailLabel}>
                            <FormattedMessage
                                id={'global.email'}
                                defaultMessage={'Email'}
                            />
                        </span>
                        <span className={classes.emailValue}>
                            {customer.email}
                        </span>
                        <span className={classes.passwordLabel}>
                            <FormattedMessage
                                id={'global.password'}
                                defaultMessage={'Password'}
                            />
                        </span>
                        <span className={classes.passwordValue}>
                            {passwordValue}
                        </span>
                    </div>
                    <div className={classes.editButtonContainer}>
                        <Button
                            className={classes.editInformationButton}
                            disabled={false}
                            onClick={showUpdateMode}
                            priority="normal"
                            data-cy="AccountInformationPage-editInformationButton"
                        >
                            <FormattedMessage
                                id={'global.editButton'}
                                defaultMessage={'Edit'}
                            />
                        </Button>
                    </div>
                </div>
                <Suspense fallback={null}>
                    <EditModal
                        formErrors={formErrors}
                        initialValues={customer}
                        isDisabled={isDisabled}
                        isOpen={isUpdateMode}
                        onCancel={handleCancel}
                        onChangePassword={handleChangePassword}
                        onSubmit={handleSubmit}
                        shouldShowNewPassword={shouldShowNewPassword}
                        recaptchaWidgetProps={recaptchaWidgetProps}
                    />
                </Suspense>
            </Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'accountInformationPage.titleAccount',
                    defaultMessage: 'Account Information'
                })}
            </StoreTitle>
            <div
                aria-live="polite"
                className={classes.title}
                data-cy="AccountInformationPage-title"
            >
                <FormattedMessage
                    id={'accountInformationPage.accountInformation'}
                    defaultMessage={'Account Information'}
                />
            </div>
            {errorMessage ? errorMessage : pageContent}
        </div>
    );
};

export default AccountInformationPage;
