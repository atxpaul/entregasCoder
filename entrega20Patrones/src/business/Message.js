class Message {
  #author;
  #text;
  #date;

  constructor({ author, text, date, id }) {
    this.author = this.setAuthor(author);
    this.text = this.setText(text);
    this.date = this.setDate(date);
    this.id = this.setId(id);
  }

  setAuthor(author) {
    if (author) {
      this.author = author;
      return author;
    } else {
      throw Error(`Missing field for message creation`);
    }
  }
  setText(text) {
    if (text) {
      this.text = text;
      return text;
    } else {
      throw Error(`Missing field for message creation`);
    }
  }
  setDate(date) {
    if (date) {
      this.date = date;
      return date;
    } else {
      throw Error(`Missing field for message creation`);
    }
  }
  setId(id) {
    if (id) {
      this.id = id;
      return id;
    } else {
      throw Error(`Missing field for message creation`);
    }
  }
}

export default Message;
