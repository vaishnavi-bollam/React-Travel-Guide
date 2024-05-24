import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VideoCard from '../VideoCard/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      productsData: [],
    })

    const url = 'https://apis.ccbp.in/tg/packages'

    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = fetchedData.packages.map(eachVideo => ({
        name: eachVideo.name,
        description: eachVideo.description,
        id: eachVideo.id,
        imageUrl: eachVideo.image_url,
      }))
      this.setState({
        productsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderVideosListView = () => {
    const {productsData} = this.state
    console.log('productsData', productsData)
    return (
      <div>
        <h1>Travel Guide</h1>
        <ul className="videos-container">
          {productsData.map(each => (
            <VideoCard each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryClicked = () => this.getVideos()

  renderFailureView = () => (
    <div>
      <p>Failed</p>
    </div>
  )

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllVideos()}</div>
  }
}

export default TravelGuide
