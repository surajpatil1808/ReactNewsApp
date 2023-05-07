import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
      country: "in",
      category: "general"   //initially general is set
    }
    static propTypes = {
      country: PropTypes.string,
      category: PropTypes.string  //this is for category news

    }

    constructor(){
        super();
        console.log("hello constructor");
        this.state={
            articles: [],
            loading: false,
            page:1
        }
    }

    async updateNews(){
      this.props.setProgress(10);  //this is for loading bar
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e92eb74f4e547a7b50987baa0246b91&page=${this.state.page}`;
      this.setState({loading:true});
      let data= await fetch(url);
      this.props.setProgress(30);  //this is for loading bar
      let parseData= await data.json();
      this.props.setProgress(70);   //this is for loading bar
      //console.log(parseData);
      this.setState({articles:parseData.articles,
        loading:false});
        this.props.setProgress(100);   //this is for loading bar

    }

    async componentDidMount(){    //this will fetch all news from api 
        this.updateNews()
      

    }

    handleNextClick= async ()=>{
    this.setState({ page:this.state.page+1});
      this.updateNews()

    }

    handlePreviousClick= async ()=>{
      this.setState({ page:this.state.page-1});
      this.updateNews()
    }



    // or this below code is same

  //   async componentDidMount(){    //this will fetch all news from api
      
  //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e92eb74f4e547a7b50987baa0246b91&page=1`;
  //     this.setState({loading:true});
  //     let data= await fetch(url);
  //     let parseData= await data.json();
  //     console.log(parseData);
  //     this.setState({articles:parseData.articles,
  //       loading:false});   
     
    

  // }

  // handleNextClick= async ()=>{


  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e92eb74f4e547a7b50987baa0246b91&page=${this.state.page + 1}`;
  //     this.setState({loading:true});
  //   let data= await fetch(url);
  //     let parseData= await data.json()
  //     // console.log(parseData);
  //   this.setState({
  //     page:this.state.page+1,
  //     articles:parseData.articles,
  //     loading:false
  //   })  


  // }

  // handlePreviousClick= async ()=>{
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e92eb74f4e547a7b50987baa0246b91&page=${this.state.page - 1}`;
  //   this.setState({loading:true});  
  //   let data= await fetch(url);
  //     let parseData= await data.json()
  //     console.log(parseData);

  //   this.setState({
  //     page:this.state.page-1,
  //     articles:parseData.articles,
  //     loading:false
  //   })  

  // }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin:"35px 0px"}}>Top HeadLines</h2>
        {this.state.loading && <Spinner/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url} >
           <NewsItem title={element?element.title.slice(0,40):""} description={element.description?element.description.slice(0,50):""} imageUrl={element.urlToImage}
           newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
           </div>

        })}
       
      </div>

      <div className="container d-flex justify-content-between"> 
      <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
      <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </div>
    )
  }
}

export default News