import BaseValidator from './base';

export default BaseValidator.create({
    properties: ['title', 'metaTitle', 'metaDescription'],

    title(model) {
        let title = model.get('title');

        if (validator.empty(title)) {
            model.get('errors').add('title', '您必须为文章指定标题.');
            this.invalidate();
        }

        if (!validator.isLength(title, 0, 150)) {
            model.get('errors').add('title', '标题不能超过150个字符.');
            this.invalidate();
        }
    },

    metaTitle(model) {
        let metaTitle = model.get('metaTitle');

        if (!validator.isLength(metaTitle, 0, 150)) {
            model.get('errors').add('metaTitle', '元标题不能超过150个字符.');
            this.invalidate();
        }
    },

    metaDescription(model) {
        let metaDescription = model.get('metaDescription');

        if (!validator.isLength(metaDescription, 0, 200)) {
            model.get('errors').add('metaDescription', '元描述不能超过200个字符.');
            this.invalidate();
        }
    }
});
