import React from 'react';


class UserPhotoForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { photoFile: null, photoUrl: null }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }

  handleFile(e) {
    const fileReader = new FileReader();
    const file = e.currentTarget.files[0];
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.photoFile) {
      formData.append('user[photo]', this.state.photoFile);
    }

    $.ajax({
      url: `/api/users/${this.props.currentUserId}`, //add currentUserId in container!!!
      method: 'PATCH',
      data: formData,
      contentType: false,
      processData: false
    }).then(
      (res) => console.log(res.message),
      (res) => {
        console.log(res.responseJSON)
      }
    );
  }

  render () {
    console.log(this.state);
    const preview = this.state.photoUrl ? <img src={this.state.photoUrl} /> : null;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file"
          onChange={this.handleFile.bind(this)} />
        <h3>Image preview </h3>
        {preview}
        <button>Upload Photo</button>
      </form>
    );
  }
}

export default UserPhotoForm;
