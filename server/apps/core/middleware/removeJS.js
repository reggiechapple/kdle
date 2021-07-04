module.exports = function (data) {
  return function (req, res, next) {
    const re = /(\b)(on\S+)=["']?(\s*)(\S+)['"]|<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g;
    const html = req.body[data];
    const results = html.match(re);

    if(results.length > 0) {
      var cleanString = html.replace(re, "");
      req.body[data] = cleanString;
    }
    
    next();
    
  }
}
