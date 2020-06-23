import React from 'react';
import BP from '../../styles/pages/blogpost.module.css';
import Link from 'next/link'

const BlogPost = props => 
    <div className={BP.container}>
      <Link href={props.link}>
        <a>
          <img src={props.image} alt='alt' className={BP.imgStyle}/>
        </a>
      </Link>
      <div id='textDiv' className={BP.textBox}>
        <Link href="/user/[username]" as={`/user/${encodeURIComponent(props.author)}`}>
          <a className={`${BP.authorContainer} neutralize-link`}>
            <img className={BP.userIcon} src="/svg/userB.svg" />
            <div>{props.author}</div>
          </a>
        </Link>
        <Link href={props.link}>
          <a className={`${BP.blackLink} neutralize-link`} >
            <h2 className={BP.title}>{props.title}</h2>  
          </a>      
        </Link>
        <Link href={props.link}>
          <a className={`${BP.description} neutralize-link`}>
            <p>{props.description}</p>
          </a>
        </Link>
        <p className={BP.date}>{props.date}</p>
      </div>
    </div>

export default BlogPost; 