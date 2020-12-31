const { Transform } = require("stream");

class UidStream extends Transform {
    constructor() {
      super({
        writableObjectMode: true,
      });
    }
  
    _transform(data, _encoding, done) {
      this.push(`data: ${JSON.stringify(data)}\n\n`);
      done();
    }
}

module.exports = UidStream;