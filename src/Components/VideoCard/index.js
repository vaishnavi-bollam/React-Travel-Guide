const VideoCard = props => {
  const {each} = props
  const {name, description, imageUrl} = each
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>
    </li>
  )
}

export default VideoCard
