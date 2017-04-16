import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
    tagName: 'section',
    classNames: ['splitbtn', 'js-publish-splitbutton'],
    classNameBindings: ['isNew:unsaved'],

    isNew: null,
    isPublished: null,
    willPublish: null,
    willSchedule: null,
    timeScheduled: null,
    postOrPage: null,
    submitting: false,
    statusFreeze: null,
    scheduledWillPublish: false,

    // Tracks whether we're going to change the state of the post on save
    isDangerous: computed('isPublished', 'willPublish', 'willSchedule', 'isScheduled', 'scheduledWillPublish', 'statusFreeze', function () {
        if (this.get('scheduledWillPublish')) {
            if (this.get('willPublish') !== this.get('willSchedule')) {
                return false;
            } else {
                return true;
            }
        } else {
            if (this.get('isPublished') !== this.get('willPublish')) {
                return true;
            } else if (this.get('isScheduled') !== this.get('willSchedule')) {
                return true;
            } else if (this.get('statusFreeze')) {
                // always show the save button in red, when we're 2 minutes before the scheduled date
                return true;
            } else {
                return false;
            }
        }
    }),

    // Text for non-scheduled Posts
    publishText: computed('isPublished', 'postOrPage', 'scheduledWillPublish', function () {
        if (this.get('scheduledWillPublish')) {
            return (this.get('willPublish') || this.get('willSchedule')) ? `更新 ${this.get('postOrPage')}` : '立即发布';
        } else {
            return this.get('isPublished') ? `更新 ${this.get('postOrPage')}` : '立即发布';
        }
    }),

    draftText: computed('isPublished', 'scheduledWillPublish', function () {
        if (this.get('scheduledWillPublish')) {
            return (!this.get('willPublish') || !this.get('willSchedule')) ? '取消发布' : '保存草稿';
        } else {
            return this.get('isPublished') ? '取消发布' : '保存草稿';
        }
    }),

    savePostText: computed('willPublish', 'publishText', 'postOrPage', 'draftText', 'scheduledWillPublish', 'willSchedule', function () {
        // we have to show the menu for a published post when a scheduled post gets published while the user is in the
        // editor and didn't refresh yet. To do so, we use the 'scheduledWillPublish' CP helper
        if (this.get('scheduledWillPublish')) {
            if (this.get('willSchedule') || this.get('willPublish')) {
                return `更新 ${this.get('postOrPage')}`;
            } else {
                return '取消发布';
            }
        } else {
            return this.get('willPublish') ? this.get('publishText') : this.get('draftText');
        }
    }),

    // Text for scheduled Posts
    scheduleText: computed('isScheduled', 'postOrPage', function () {
        return this.get('isScheduled') ? `更新 ${this.get('postOrPage')}` : '计划发布';
    }),

    unscheduleText: computed('isScheduled', function () {
        return this.get('isScheduled') ? '取消预约' : '保存草稿';
    }),

    saveScheduleText: computed('willSchedule', 'scheduleText', 'unscheduleText', function () {
        return this.get('willSchedule') ? this.get('scheduleText') : this.get('unscheduleText');
    }),

    deleteText: computed('postOrPage', function () {
        return `删除 ${this.get('postOrPage')}`;
    }),

    activeClass: computed('willPublish', 'willSchedule', function () {
        return this.get('willPublish') || this.get('willSchedule') ? true : false;
    }),

    actions: {
        save() {
            this.sendAction('save');
        },

        setSaveType(saveType) {
            this.sendAction('setSaveType', saveType);
        },

        delete() {
            this.sendAction('delete');
        }
    }
});
