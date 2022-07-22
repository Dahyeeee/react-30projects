function ImageFile(props: { src: string }) {
  return (
    <div className="image">
      <img alt="" src={props.src} />
    </div>
  );
}

export default ImageFile;
