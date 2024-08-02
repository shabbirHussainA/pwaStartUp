import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Field from '@magento/venia-ui/lib/components/Field';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Password from '@magento/venia-ui/lib/components/Password';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Select from '@magento/venia-ui/lib/components/Select'
import {
    isRequired,
    hasLengthAtLeast,
    validatePassword,
    isNotEqualToField
} from '@magento/venia-ui/lib/util/formValidators';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import defaultClasses from './editForm.module.css';

const EditForm = props => {
    const {
        classes: propClasses,
        handleChangePassword,
        shouldShowNewPassword
    } = props;
    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, propClasses);
    const titleOptions = [
        { label: 'Mr', value: 'Mr' },
        { label: 'Miss', value: 'Miss' },
        { label: 'Ms', value: 'Ms' },
        { label: 'Mrs', value: 'Mrs' },
        { label: 'Mix', value: 'Mix' },
    ];
    const maybeNewPasswordField = shouldShowNewPassword ? (
        <div className={classes.newPassword}>
            <Password
                fieldName="newPassword"
                label={formatMessage({
                    id: 'global.newPassword',
                    defaultMessage: 'New Password'
                })}
                validate={combine([
                    isRequired,
                    [hasLengthAtLeast, 8],
                    validatePassword,
                    [isNotEqualToField, 'password']
                ])}
                isToggleButtonHidden={false}
                data-cy="newPassword"
            />
        </div>
    ) : null;

    const maybeChangePasswordButton = !shouldShowNewPassword ? (
        <div
            className={classes.changePasswordButtonContainer}
            data-cy="editForm-changePasswordButtonContainer"
        >
            <LinkButton
                classes={classes.changePasswordButton}
                type="button"
                onClick={handleChangePassword}
                data-cy="linkButton-root"
            >
                <FormattedMessage
                    id={'global.changePassword'}
                    defaultMessage={'Change Password'}
                />
            </LinkButton>
        </div>
    ) : null;

    const passwordLabel = shouldShowNewPassword
        ? formatMessage({
              id: 'global.currentPassword',
              defaultMessage: 'Current Password'
          })
        : formatMessage({
              id: 'global.password',
              defaultMessage: 'Password'
          });
    return (
        <Fragment>
            <div className={classes.root}>
                <div className={classes.firstname}>
                    <Field
                        id="firstname"
                        label={formatMessage({
                            id: 'global.firstName',
                            defaultMessage: 'First Name'
                        })}
                    >
                        <TextInput
                            field="firstname" //the data is coming from here 
                            validate={isRequired}
                            data-cy="firstname"
                        />
                    </Field>
                </div>
                <div className={classes.middlename}>
                    <Field
                        id="middlename"
                        label={formatMessage({
                            id: 'global.middleName',
                            defaultMessage: 'middle Name'
                        })}
                    >
                        <TextInput
                            field="middlename" //the data is coming from here 
                            validate={isRequired}
                            data-cy="middlename"
                        />
                    </Field>
                </div>
                <div className={classes.custom_cust_attribute}>
                    <Field
                        id="custom_cust_attribute"
                        label={formatMessage({
                            id: 'global.custom_cust_attribute',
                            defaultMessage: 'custom_cust_attribute'
                        })}
                    >
                        <TextInput
                            field="custom_cust_attribute" //the data is coming from here 
                            validate={isRequired}
                            data-cy="custom_cust_attribute"
                        />
                    </Field>
                </div>
                <div className={classes.company_name}>
                    <Field
                        id="company_name"
                        label={formatMessage({
                            id: 'global.company_name',
                            defaultMessage: 'company_name'
                        })}
                    >
                        <TextInput
                            field="company_name" //the data is coming from here 
                            validate={isRequired}
                            data-cy="company_name"
                        />
                    </Field>
                </div>
                <div className={classes.company_name}>
                    <Field
                        id="building_floor"
                        label={formatMessage({
                            id: 'global.building_floor',
                            defaultMessage: 'building_floor'
                        })}
                    >
                        <TextInput
                            field="building_floor" //the data is coming from here 
                            validate={isRequired}
                            data-cy="building_floor"
                        />
                    </Field>
                </div>
                <div className={classes.department}>
                    <Field
                        id="department"
                        label={formatMessage({
                            id: 'global.department',
                            defaultMessage: 'department'
                        })}
                    >
                        <TextInput
                            field="department" //the data is coming from here 
                            validate={isRequired}
                            data-cy="department"
                        />
                    </Field>

                </div>
                <div className={classes.title}>
                    <Field
                        id="title"
                        label={formatMessage({
                            id: 'global.title',
                            defaultMessage: 'title'
                        })}
                    >
                        {/* <TextInput
                            field="title" //the data is coming from here 
                            validate={isRequired}
                            data-cy="title"
                        /> */}
                        <Select field='title'  validate={isRequired}
                            data-cy="title" items={titleOptions}>
                        </Select>
                    </Field>
                </div>
                <div className={classes.mobile_phone}>
                    <Field
                        id="mobile_phone"
                        label={formatMessage({
                            id: 'global.mobile_phone',
                            defaultMessage: 'mobile_phone'
                        })}
                    >
                        <TextInput
                            field="mobile_phone" //the data is coming from here 
                            validate={isRequired}
                            data-cy="mobile_phone"
                        />
                    </Field>
                </div>
                <div className={classes.profession}>
                    <Field
                        id="profession"
                        label={formatMessage({
                            id: 'global.profession',
                            defaultMessage: 'profession'
                        })}
                    >
                        <TextInput
                            field="profession" //the data is coming from here 
                            validate={isRequired}
                            data-cy="profession"
                        />
                    </Field>
                </div>
                <div className={classes.lastname}>
                    <Field
                        id="lastname"
                        label={formatMessage({
                            id: 'global.lastName',
                            defaultMessage: 'Last Name'
                        })}
                    >
                        <TextInput
                            field="lastname"
                            validate={isRequired}
                            data-cy="lastname"
                        />
                    </Field>
                </div>
                <div className={classes.email}>
                    <Field
                        id="email"
                        label={formatMessage({
                            id: 'global.email',
                            defaultMessage: 'Email'
                        })}
                    >
                        <TextInput
                            field="email"
                            validate={isRequired}
                            data-cy="email"
                        />
                    </Field>
                </div>
                <div className={classes.password}>
                    <Password
                        fieldName="password"
                        label={passwordLabel}
                        validate={isRequired}
                        autoComplete="current-password"
                        isToggleButtonHidden={false}
                        data-cy="password"
                    />
                </div>
                {maybeNewPasswordField}
            </div>
            {maybeChangePasswordButton}
        </Fragment>
    );
};

export default EditForm;

EditForm.propTypes = {
    classes: shape({
        changePasswordButton: string,
        changePasswordButtonContainer: string,
        root: string,
        field: string,
        email: string,
        firstname: string,
        middlename: string,
        company_name: string,
        building_floor: string,
        department: string,
        title: string,
        mobile_phone: string,
        profession: string,
        custom_cust_attribute: string,
        lastname: string,
        buttons: string,
        passwordLabel: string,
        password: string,
        newPassword: string
    })
};
