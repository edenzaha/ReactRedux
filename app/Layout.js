import React from 'react';
import styles from './css/App.css';

class Layout extends React.Component {
    render(){
        return (
            <div id="page" className={styles.page}>
                <div id="header" className={styles.header}>
                    MY SHELL APPLICATION - {this.props.pageDescription}
                </div>
                <div id="body" className={styles.body}>
                    {this.props.children}
                </div>
                <div id="footer" className={styles.footer}>
                    All rights reserved to Eden Zaharoni &copy;
                </div>
            </div>            
        );
    }
}


export default Layout;