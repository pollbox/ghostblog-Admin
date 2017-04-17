import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import CurrentUserSettings from 'ghost-admin/mixins/current-user-settings';
import styleBody from 'ghost-admin/mixins/style-body';

export default AuthenticatedRoute.extend(styleBody, CurrentUserSettings, {
    titleToken: '设置-应用',

    classNames: ['settings-view-apps'],

    beforeModel() {
        this._super(...arguments);
        return this.get('session.user')
            .then(this.transitionAuthor())
            .then(this.transitionEditor());
    },

    model() {
        return this.store.queryRecord('setting', {type: 'blog,theme,private'});
    }
});
