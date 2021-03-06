const db = require('../../../db/db.js');
const _ = require('lodash');

module.exports = {
    /**
     * Adds a topic to the topics collection in db and returns the topic with its id set
     */
    add_topic: (topic) => {
        // if (arguments.length != 1) throw 'Invalid argument';
        if (module.exports.validate_create(topic)) {
            var new_index = db.topics.length;
            topic.id = new_index;
            db.topics.push(topic);
            return _.cloneDeep(topic);
        } else {
            throw 'Invalid topic';
        }
    },

    /**
     * Retrieves a topic from the topics collection in db
     */
    get_topic_by_id: (id) => {
        // if (arguments.length != 1) throw 'Invalid argument';
        if (isNaN(id)) {
            throw 'Id not a number';
        } else if (id < 0) {
            throw 'Id not positive';
        } else {
            return db.topics[id];
        }
    },

    /**
     * Retrieves a list of all topics
     */
    get_all_topics: () => {
        // if (arguments.length != 0) throw 'Invalid argument';
        let res = [];
        let f = db.topics.forEach(element => {
            if (element != null && element != undefined) res.push(element);
        });
        return res;
    },
    
    /**
     * Checks if a topic is actually a topic and if it has all required fields to be added
     * to the topics collection in db (namely the title attribute)
     */
    validate_create: (topic) => {
        // if (arguments.length != 1) throw 'Invalid argument';
        // 'Topic != null' checks for both null and undefined
        if (topic == null || 
                ((typeof topic.title) != 'string' && !(topic.title instanceof String)) || 
                topic.title.length <= 0) {
            return false;
        } else {
            return true;
        }
    }
}