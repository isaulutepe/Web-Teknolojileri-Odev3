import "./App.css";
import React from 'react' //State kullanabilmek için iöport ettik.


function Arama({ aramaMetni, onSearch }) { //Arama işlemini kullanabilmek için props ekledik.
  //State kullanımı.
  function handleChange(event) { //Methot içinde methot oluşturabiliri. Hadler- etkileşim kullanımı.
    //Yazılan metini consola yazdırma işlemi yapalım. 
    // setAramaMetni(event.target.value); //Metin her değiştiğinde bu fonksiyon çağırılacak ve yeni durum değişecek
    // //Her zaman arama kutusunda en son yazıdgımız bilgi kalıcı olacak.
    onSearch(event); //Gerçekleşen olayı yukarı göndermiş olduk.Aramanın içinde yer alan onSearch içinde ne zaman değişiklik olsa bunu tetiklemiş oluruz.    


  }
  return ( //Return içine yazılan kodlar her zaman bir kapsayıcı içinde olmalıdır Direk yazılırsa hata verir.
    <div>
      <label htmlFor="arama">Ara: </label>
      <input id="arama" value={aramaMetni} type="text" onChange={handleChange} />

    </div>
  )
}
function Yazi({ id, url, baslik, yazar, yorum_sayisi, puan }) { //Props üst bileşenden alt bileşene veri geçirmeye yarar.
  return (
    <li key={id}>
      <span>
        <a href={url}>{baslik}</a>,
      </span>
      <span><b>Yazar:</b> {yazar}, </span>
      <span><b>Yorum Sayısı:</b> {yorum_sayisi}, </span>
      <span><b>Puan:</b> {puan}</span>
    </li>
  )
}
function Liste(props) {
  //Bileşenlerin baş harfi bütük olsun
  return ( //Ekranda görünen her şey return içine yazılmalı.
    <ul>
      {props.yazilar.map(function (yazi) {
        return (
          <Yazi key={yazi.id} {...yazi} />
        );
      })}{" "}
    </ul>
  )
}

function App() {
  const [aramaMetni, setAramaMetni] = React.useState(
    localStorage.getItem("aranan") || "React"); //Boşsa reack eğer önceden arana değer varsa o yazsın.

  //Bunlar props değerleri olur kullanımı Liste methodu içinde görülmektedir.
  const yaziListesi = [
    {
      baslik: "React Öğreniyorum",
      url: "www.sdu.edu.tr",
      yazar: "Sinan Yüksel",
      yorum_sayisi: 3,
      puan: 4,
      id: 0,
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 1,
    },
    {
      baslik: "Asp .net",
      url: "wwww.google.com.tr",
      yazar: "Mehmet kılıc",
      yorum_sayisi: 2,
      puan: 100,
      id: 2,
    },
    {
      baslik: "Html - Css",
      url: "wwww.google.com.tr",
      yazar: "Arda Çankaya",
      yorum_sayisi: 2,
      puan: 100,
      id: 3,
    },
    {
      baslik: "Matematik",
      url: "wwww.google.com.tr",
      yazar: "Kurtuluş Oğan",
      yorum_sayisi: 2,
      puan: 5,
      id: 4,
    }
  ];
  React.useEffect(() => {
    localStorage.setItem("aranan", aramaMetni);
  }, [aramaMetni]); //Ne zaman arama metininde değişiklik olsa tetiklenecek ve yazacak.

  const arananYazilar = yaziListesi.filter(
    //Filter da map ile aynı mantıkla çalışırdiziyi gezer.
    //Filter arkada bir for çalıştırır ve her değeri tek tek yazi değişkenşnde tutar.
    function (yazi) {
      return yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) 
      || yazi.yazar.toLowerCase().includes(aramaMetni.toLowerCase());
      
      //includes Metin içinde kelime geçişini yakalar.
      //ToLowerCase ifadeleri eklendiği için artık ne yazılırsa yazılsın küçük harf olarak arıyor, aranan değeride küçük harfe çeviriyor bu da
      //büyük küçük harf duyarlılığını ortadan kaldrımış oluyor.
    }
  );
  //1.Aşama callBack handler methodu oluşturmak.
  function handleSearch(event) {
    //Filtreleme işlemi yapmak içinç
    console.log(event.target.value); //veri geliyyo mu kontrolü için.
    setAramaMetni(event.target.value);

  }
  return (
    <div>
      <h1>Yazılar</h1>
      <Arama aramaMetni={aramaMetni} onSearch={handleSearch} />
      <p>
        <strong>
          {aramaMetni} aranıyor...
        </strong>
      </p>
      <hr />
      <Liste yazilar={arananYazilar} />


    </div>
  );
}
export default App;
