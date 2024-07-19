import React from 'react'
 
const Progress_bar = ({cursor,bgcolor,progress,height}) => {
    
    const Parentdiv = {
       
        cursor:cursor,
        height: height,
        width: '55rem',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 50
      }
     
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
       borderRadius:40,
        textAlign: 'right'
      }
     
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }
       
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    )
}
 
export default Progress_bar;