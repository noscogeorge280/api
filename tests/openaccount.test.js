var openaccount = require('../services/createaccount');

test('Open Account', () => {
    expect(openaccount.openaccount).toHaveBeenNthCalledWith('1245789635','George Test2','look@test.com', 'P@ssw0rd' );
    
  });