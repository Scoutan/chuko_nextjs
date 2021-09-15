import { useEffect } from 'react';

export default function ItemDetail({ item, pendingStockUpdate, fetchStock, removeItem, index, containerClass }) {
  useEffect(() => {
    if (item.HSstock !== 'In Stock' || item.AAstock === '0') {
      return document.getElementById(item.itemID).classList.add('red');
    }
  });

  return (
    <div id={item.itemID} className={containerClass}>
      <div className="image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="description">
        <div className="header">
          {(item.AAtitle) ? item.AAtitle : item.HStitle}
        </div>
        <div className="section box-wrapper">
          <div className="box">
            <div className="icon">
              <a href={item.HSurl} title={item.HSurl} target="_blank" rel="noreferrer">
                <img src='https://www.1999.co.jp/images/hd_logomark_e.png' alt='HobbySearch' />
              </a>
            </div>
            <b>{item.HSprice}</b>
            <br />
            {item.HSstock}
            <br />
          </div>
          <div className="box">
            <div className="icon">
              <a href={item.AAurl} title={item.AAurl} target="_blank" rel="noreferrer">
                <img src='https://www.amiami.com/images/common/site_logo.png' alt='amiami' />
              </a>
            </div>
            <b>{item.AAprice}</b>
            <br />
            Stock: {item.AAstock}
          </div>
        </div>
        <div className="section">
          <a href={item.MFCurl} title={item.MFCurl} target="_blank" rel="noreferrer">
            MyFigureCollection's page
          </a>
        </div>
        <div className="section">
          Release Date: {item.release}
        </div>
        <div className="section">
          <button className="button" onClick={fetchStock} value={index}>
            Update Stock
          </button>
          <button className="button" onClick={removeItem} value={index}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}