import styled from 'styled-components';
import axios from 'axios';
import { useRef, useState } from 'react';

const Container = styled.div`
  width: 80%;
  height: 800px;
  margin: 0 auto;
  margin-top: 40px;

  > h1 {
    margin-top: 60px;
    text-align: center;
    color: #efefef;
    font-family: 'Light';
    font-size: 20px;
  }
  > p {
    margin-top: 60px;
    text-align: center;
    color: #efefef;
    font-family: 'Light';
    font-size: 14px;
  }
`;

const AlbumBox = styled.div`
  border: 1px solid #646464;
  border-radius: 5px;
  width: 100%;

  > form {
    display: flex;
    height: 450px;
    justify-content: space-around;
    align-items: center;
  }
`;

const UploadBox = styled.div`
  width: 38%;
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ImgUpload = styled.div`
  border: 0.5px dashed #646464;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  > h3 {
    color: #999999;
    margin: 0px 10px;
    align-self: flex-start;
    font-size: 14px;
    font-family: 'Fly';
  }

  > img {
    width: 90%;
    height: 67%;
  }
`;

const UploadInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 30px;

  > .file_name {
    width: 75%;
    font-size: 12px;
    background-color: transparent;
    color: #999999;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  > label {
    color: black;
    background-color: #999999;
    text-align: center;
    font-size: 70%;
    margin-left: 10px;
    cursor: pointer;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: keep-all;
    font-family: 'Fly';
  }

  > input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

const MusicUpload = styled.div`
  width: 100%;
  height: 25%;
  border: 0.5px dashed #646464;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > h3 {
    color: #999999;
    margin: 0px 10px;
    align-self: flex-start;
    font-size: 14px;
    font-family: 'Fly';
  }
`;

const AlbumInfo = styled.div`
  border: 0.5px dashed #646464;
  width: 60%;
  height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  > h3 {
    color: #999999;
    padding: 0px 10px;
    font-size: 14px;
    font-family: 'Fly';
  }
`;

const AlbumForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  color: #646464;
  height: 80%;

  #submit {
    border: 0.5px solid #efefef;
    display: inline-block;
    cursor: pointer;
    color: #efefef;
    font-family: 'Fly';
    font-size: 14px;
    width: 25%;
    height: 50px;
    align-self: flex-end;
    margin-right: 10px;
  }

  #submit:hover {
    background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
    background-color: #efefef;
    color: black;
  }

  #submit:active {
    position: relative;
    top: 1px;
  }

  > input[type='text'] {
    background-color: transparent;
    width: 94%;
    height: 20%;
    padding-left: 5px;
    border-bottom: solid 0.5px #646464;
  }

  > input[type='text']:focus {
    outline: none;
  }

  > textarea {
    background-color: transparent;
    width: 94%;
    height: 80%;
    outline: none;
    padding: 10px 5px;
    resize: none;
  }
`;

const UploadContainer = () => {
  const [coverName, setCoverName] = useState('');
  const [audioName, setAudioName] = useState('');
  const coverRef = useRef<HTMLInputElement>();
  const imgRef = useRef<HTMLImageElement>();
  const audioRef = useRef<HTMLInputElement>();

  const uploadCover = async (file: FormData) => {
    try {
      const { data } = await axios.post('https://nft-unes-test-be.vercel.app/api/upload/thumbnail', file, {
        headers: {
          'Access-Control-Allow-Origin': true,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const uploadMusic = async (file: FormData) => {
    try {
      const { data } = await axios.post('https://nft-unes-test-be.vercel.app/api/upload/music', file, {
        headers: {
          'Access-Control-Allow-Origin': true,
        },
      });
      console.log('뮤직데이터', data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const upload = async (e: any) => {
    e.preventDefault();
    const formDataImg: FormData = new FormData();
    const formDataAudio: FormData = new FormData();
    formDataImg.append('cover', e.target.cover.files[0]);
    formDataAudio.append('music', e.target.music.files[0]);
    for (let value of formDataImg.values()) {
      console.log('밸류1', value);
    }
    for (let value of formDataAudio.values()) {
      console.log('밸류2', value);
    }
    console.log(formDataAudio);

    uploadCover(formDataImg);
    uploadMusic(formDataAudio);
  };

  const readURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let reader: FileReader = new FileReader();
      // coverRef.current.value = e.target.files[0].name;
      setCoverName(e.target.files[0].name);
      reader.onload = function (e) {
        imgRef.current.src = `${e.target.result}`;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const attachAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioName(e.target.files[0].name);
  };

  return (
    <Container>
      <AlbumBox>
        <form encType="multipart/form-data" onSubmit={upload}>
          <UploadBox>
            <ImgUpload>
              <h3>1. cover 사진 첨부</h3>
              <img id="preview" ref={imgRef} />
              <UploadInput>
                <input className="file_name" ref={coverRef} value={coverName} disabled />
                <label htmlFor="album_cover">파일찾기</label>
                <input type="file" name="cover" id="album_cover" accept="image/*" onChange={readURL} src="" />
              </UploadInput>
            </ImgUpload>
            <MusicUpload>
              <h3>2. 음악 첨부</h3>
              <UploadInput>
                <input className="file_name" ref={audioRef} value={audioName} disabled />
                <label htmlFor="music">파일찾기</label>
                <input type="file" name="music" id="music" accept="audio/*" onChange={attachAudio} />
              </UploadInput>
            </MusicUpload>
          </UploadBox>
          <AlbumInfo>
            <h3>3. 음원 소개</h3>
            <AlbumForm>
              <input type="text" placeholder="작사가를 입력해주세요" />
              <input type="text" placeholder="작곡가를 입력해주세요" />
              <textarea cols={50} rows={8} placeholder="곡 소개"></textarea>
              <input type="submit" id="submit" value="업로드" />
            </AlbumForm>
          </AlbumInfo>
        </form>
      </AlbumBox>
      <p>Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.</p>
    </Container>
  );
};

export default UploadContainer;
