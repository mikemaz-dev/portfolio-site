import Script from 'next/script'

const YANDEX_METRIKA_ID = 112067922

export function YandexMetrika() {
	return (
		<>
			<Script
				id='yandex-metrika'
				strategy='afterInteractive'
			>{`
				(function(m,e,t,r,i,k,a){
					m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
					m[i].l=1*new Date();
					for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
					k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
				})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}','ym');

				ym(${YANDEX_METRIKA_ID},'init',{ssr:true,clickmap:true,ecommerce:'dataLayer',referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
			`}</Script>
			<noscript>
				<div>
					{/* biome-ignore lint/performance/noImgElement: Yandex Metrika requires a raw noscript tracking pixel. */}
					<img
						alt=''
						height='1'
						src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
						style={{ position: 'absolute', left: '-9999px' }}
						width='1'
					/>
				</div>
			</noscript>
		</>
	)
}
