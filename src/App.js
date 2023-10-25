import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
const App =()=> {
  // apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  const pageSize=5;
    // this.pageSize = 15 // use variable outside the return tag and use this word to set the class
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            {/* <Route exact path='/about' element={<About  mode={mode}/>}/> */}
            <Route exact path='/Business' element={<News setProgress={setProgress} key="business" pageSize={pageSize}  country={'in'} category={"business"} />} />
            <Route exact path='/Entertainment' element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize}  country={'in'} category={"entertainment"} />} />
            <Route exact path='/' element={<News setProgress={setProgress} key="general" pageSize={pageSize}  country={'in'} category={"general"} />} />
            <Route exact path='/Health' element={<News setProgress={setProgress} key="health" pageSize={pageSize}  country={'in'} category={"health"} />} />
            <Route exact path='/Science' element={<News setProgress={setProgress} key="science" pageSize={pageSize}  country={'in'} category={"science"} />} />
            <Route exact path='/Sports' element={<News setProgress={setProgress} key="sports" pageSize={pageSize}  country={'in'} category={"sports"} />} />
            <Route exact path='/Technology' element={<News setProgress={setProgress} key="technology" pageSize={pageSize}  country={'in'} category={"technology"} />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
}

export default App