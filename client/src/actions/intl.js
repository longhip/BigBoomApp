import fetch from '../core/fetch';
import en_locale from '../messages/en.json';
import vi_locale from '../messages/vi.json';
import {
  SET_LOCALE_START,
  SET_LOCALE_SUCCESS,
  SET_LOCALE_ERROR,
} from '../constants';

export function setLocale({ locale }) {
  return async (dispatch) => {
    dispatch({
        type: SET_LOCALE_START,
        payload: {
            locale,
        },
    });

    try {
        const messages = vi_locale.reduce((msgs, msg) => {
            msgs[msg.id] = msg.message; // eslint-disable-line no-param-reassign
            return msgs;
        }, {});
        dispatch({
            type: SET_LOCALE_SUCCESS,
            payload: {
                locale,
                messages,
            },
        });

      // remember locale for every new request
        if (process.env.BROWSER) {
            const maxAge = 3650 * 24 * 3600; // 10 years in seconds
            document.cookie = `lang=${locale};path=/;max-age=${maxAge}`;
        }
    } catch (error) {
        dispatch({
            type: SET_LOCALE_ERROR,
            payload: {
                locale,
                error,
            },
        });
        return false;
    }

    return true;
  };
}
