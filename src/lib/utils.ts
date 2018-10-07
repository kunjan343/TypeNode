import { injectable } from 'inversify';

/**
 * Object handler class interface
 */
export interface IUtils {
    randomString(length: number): string;
}

/**
 * Implements common utility methods
 */
@injectable()
export class Utils implements IUtils {
    private alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    /**
     * Generate random string based on input length.
     * Useful for creating random username.
     * @param length
     * @returns generated string
     */
    public randomString = (length: number): string => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += this.alphaNumeric.charAt(Math.floor(Math.random() * this.alphaNumeric.length));
        }
        return result;
    }
}
