import BaseValidator from './base';

export default BaseValidator.create({
    properties: ['newPassword'],

    newPassword(model) {
        let p1 = model.get('newPassword');
        let p2 = model.get('ne2Password');

        if (validator.empty(p1)) {
            model.get('errors').add('newPassword', '请输入密码.');
            this.invalidate();
        } else if (!validator.isLength(p1, 8)) {
            model.get('errors').add('newPassword', '密码不够长.');
            this.invalidate();
        } else if (!validator.equals(p1, p2)) {
            model.get('errors').add('ne2Password', '这两个新密码不匹配.');
            this.invalidate();
        }
    }
});
