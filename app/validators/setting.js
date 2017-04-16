import BaseValidator from './base';

export default BaseValidator.create({
    properties: ['title', 'description', 'password', 'postsPerPage'],
    title(model) {
        let title = model.get('title');

        if (!validator.isLength(title, 0, 150)) {
            model.get('errors').add('title', '标题过长');
            this.invalidate();
        }
    },

    description(model) {
        let desc = model.get('description');

        if (!validator.isLength(desc, 0, 200)) {
            model.get('errors').add('description', '说明过长');
            this.invalidate();
        }
    },

    password(model) {
        let isPrivate = model.get('isPrivate');
        let password = model.get('password');

        if (isPrivate && password === '') {
            model.get('errors').add('password', '必须提供密码');
            this.invalidate();
        }
    },

    postsPerPage(model) {
        let postsPerPage = model.get('postsPerPage');

        if (!validator.isInt(postsPerPage)) {
            model.get('errors').add('postsPerPage', '每页文章必须是数字');
            this.invalidate();
        } else if (postsPerPage > 1000) {
            model.get('errors').add('postsPerPage', '每页的文章数上限为1000');
            this.invalidate();
        } else if (postsPerPage < 1) {
            model.get('errors').add('postsPerPage', '每页最少文章数为1');
            this.invalidate();
        }
    }
});
