import BaseValidator from './base';

export default BaseValidator.create({
    properties: ['identification', 'signin', 'forgotPassword'],
    invalidMessage: 'Email address is not valid',

    identification(model) {
        let id = model.get('identification');

        if (!validator.empty(id) && !validator.isEmail(id)) {
            model.get('errors').add('identification', this.get('invalidMessage'));
            this.invalidate();
        }
    },

    signin(model) {
        let id = model.get('identification');
        let password = model.get('password');

        model.get('errors').clear();

        if (validator.empty(id)) {
            model.get('errors').add('identification', '请输入电子邮件');
            this.invalidate();
        }

        if (!validator.empty(id) && !validator.isEmail(id)) {
            model.get('errors').add('identification', this.get('invalidMessage'));
            this.invalidate();
        }

        if (validator.empty(password)) {
            model.get('errors').add('password', '请输入密码');
            this.invalidate();
        }
    },

    forgotPassword(model) {
        let id = model.get('identification');

        model.get('errors').clear();

        if (validator.empty(id) || !validator.isEmail(id)) {
            model.get('errors').add('identification', this.get('invalidMessage'));
            this.invalidate();
        }
    }
});
