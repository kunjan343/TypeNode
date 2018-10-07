/**
 * Store user route messages text
 */
export const USER_MESSAGE = {
    SUCCESS: {
        CREATE: 'Successfully created',
        UPDATE: 'Successfully updated',
        DELETE: 'Successfully deleted'
    },
    ERROR: {
        EMPTY: {
            USERNAME: 'Username required',
            PASSWORD: 'Password required'
        },
        INVALID: {
            EMAIL: 'Email format is invalid'
        },
        CONFLICT: {
            USERNAME: 'Username is already exist'
        },
        EXCEPTION: 'Something went wrong, please try again'
    }
};
