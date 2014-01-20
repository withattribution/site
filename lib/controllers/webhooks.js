

exports.stripe = function(req,res) {
  console.log('oooooo - mmmmmmmm - ggggggg : event received!');
  console.log(req.body.type);
  console.log(req.query.type);
  console.log('oooooo - mmmmmmmm - ggggggg : event received!');
  console.log(req.body);

  res.json('OK');
};