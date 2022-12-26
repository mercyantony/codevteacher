/* eslint-disable no-nested-ternary */

import * as _ from 'lodash';

const projectionObj = (object, projection) => {
    const result = Object.keys(projection).reduce((a, e) => {
        if (_.isEmpty(object[e]) && projection[e] != 1) {
            return {
                ...a,
                [e]: null
            };
        }

        if (projection[e] == 1) {
            return {
                ...a,
                [e]: object[e]
            };
        }

        return {
            ...a,
            [e]: projectionObj(object[e], projection[e])
        };
    }, {});
    return result;
};

export default projectionObj;

