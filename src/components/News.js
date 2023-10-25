import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
    // use static to use proptypes in class based react component
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [progress, setProgress] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
        
    const updateNews=async()=>{
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4b6f740f1198445c9a98d6485dc8c8b1&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        props.setProgress(40)
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(80)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        updateNews()
        /* eslint-disable */
        document.title = `${capitalizeFirstLetter( props.category)} - NewsMonkey`

    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=4b6f740f1198445c9a98d6485dc8c8b1&page=${page+1}&pageSize=${ props.pageSize}`
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
        return (
            <>
                <h1 className='text-center my-3'>Latest Headlines of {capitalizeFirstLetter( props.category)} on NewsMonkey</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}   
                    hasMore={articles.length < totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row my-3">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
    News.defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    };
    
    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    };

export default News