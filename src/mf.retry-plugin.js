import {RetryPlugin} from '@module-federation/retry-plugin';

export default () => RetryPlugin({
    retryDelay: 1000,
    retryTimes: 5,
    onRetry   : ({times, url,}) => console.log('Retrying...', times, url),
    onSuccess : ({url,}) => console.log('Success', url),
    onError   : ({url,}) => console.log('Failed', url),
});
