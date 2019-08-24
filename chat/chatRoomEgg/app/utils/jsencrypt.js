const JSEncrypt = require('node-jsencrypt');
module.exports.jsencrypt = (str) => {
    str = str.replace(/%2B/g, '+');
    //解密
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey("MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMHKLoBlh+ruP9HbNQILaTttLs4D7dF7ZtSsdqLiV8nPPDEAKLuZl2yBD5/e4I2c9OIsDM2YG53JnkS9T95L7ebEEtakFvNnlrpyI1DJC8F0OnfPoDkjyhWz25ms5EfsL3Kb3Ni5Tv8JoB8qJ01Y1Yl+JI7DWcqBgktBUAtSEFSdAgMBAAECgYAXbk65D42jhjMJOKvsF10d5lGmbysuDPGd/UxK3Xsn13q7of1K0YNRhzlQZy5XcQba4eCaay3LojkUrp8djaix7FwGJulrH5589VS2ytVyniJMo/2j0NTIj432MA3N6pv8pTOyn47Xbj55tiuI9BWYR+0/vm85a7tCeTGRUgfogQJBAOMPRsqO6FjvYS4kTiswOQlfNWjj8N3gCeadAj5DkXmUjNqlhUb3EKHrxwK1PkebdlYsi+U8+Wkc6u67sQaFr8kCQQDafVerik20h6tUveAgoNEOjuzoaAg5v1si+F1YA2EDy6PwgJqLwQaqMfR/qvKFMONK8Kfmzd0Emii9cw9bI3A1AkEAnZgpy0d7Dtc+/RanxqQWwmF5oY6rzGPGm3CYcPzWyKsJRGyj34h129zY6RFA49SMQu1yP66dcY5npUFScjNxuQJAZd5i7dwB9tX6j/wnb48LadpBouo+S45ok5lxDAQnS3m66ftMEzTgQqIf+RZfFLKChwJFhlsdXXPy4sGuuzN+sQJBALUUTHtqufu0uCJEpZ4WHPB0yvq/GCO99kZUzfcMYzHW6sW2skP1zLtXTqwARjrsaTMw4jhGbTSuBlOSJVbQYj8=");
    str = decrypt.decrypt(str);

    return str;
}