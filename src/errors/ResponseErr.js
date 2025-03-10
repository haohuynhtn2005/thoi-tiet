class ResponseErr extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ResponseErr';
    this.status = status;
  }
}

export default ResponseErr;
