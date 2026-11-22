import{mkdirSync as A,readdirSync as B,readFileSync as C,writeFileSync as D}from"node:fs";
const T=`"3c&(,-1!!!!!!!!+++++++'+++'+++!+++!!!!!!!!!!!!!BFFB"!!!!!!!!!!!'*!!!!!!!!!!!!!!&&#&`;
function run(p,q){
const S=new Int32Array(256),K=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536);
let a=0,b=0,c=0,d=0,e=0,f=0;
const g=t=>({out:U.slice(0,c),code:t});
for(;;){
if(f===1e6)return g(10);
if(e<0||e>=p.length)return g(9);
const h=p[e];
let i=T.charCodeAt(h)-33;
if(!i)return g(5);
i--;
const j=i>>4,k=i>>2&3,l=i&3;
if(e+j>=p.length)return g(9);
f++;
const m=e+1+j;
if(a<k)return g(2);
if(a-k+l>256)return g(3);
e=m;
if(h===0)return g(0);
if(h===1){S[a++]=(p[m-1]<<24)>>24;continue;}
if(h===2){S[a++]=p[m-4]|p[m-3]<<8|p[m-2]<<16|p[m-1]<<24;continue;}
if(h===3){a--;continue;}
if(h===4){S[a]=S[a-1];a++;continue;}
if(h===5){[S[a-1],S[a-2]]=[S[a-2],S[a-1]];continue;}
if(h===6){S[a]=S[a-2];a++;continue;}
if(h===7){[S[a-3],S[a-2],S[a-1]]=[S[a-2],S[a-1],S[a-3]];continue;}
if(h===23){S[a-1]=-S[a-1]|0;continue;}
if(h===27){S[a-1]=~S[a-1];continue;}
if(h>=16&&h<=34){
const y=S[a-1],x=S[a-2];
let r;
if(h>18&&h<23&&!y)return g(4);
r=h===16?x+y|0:h===17?x-y|0:h===18?Math.imul(x,y):h===19?x/y|0:h===20?x%y|0:h===21?(x>>>0)/(y>>>0)|0:h===22?(x>>>0)%(y>>>0)|0:h===24?x&y:h===25?x|y:h===26?x^y:h===28?x<<(y&31):h===29?x>>(y&31):h===30?(x>>>(y&31))|0:h===32?x===y?1:0:h===33?x<y?1:0:(x>>>0)<(y>>>0)?1:0;
a-=2;S[a++]=r;continue;
}
if(h>=48&&h<=50){
const t=(p[m-2]|p[m-1]<<8)<<16>>16;
if(h===48||(h===49)===(S[--a]===0))e=m+t;
continue;
}
if(h===51){if(b===64)return g(7);K[b++]=m;e=p[m-2]|p[m-1]<<8;continue;}
if(h===52){if(!b)return g(8);e=K[--b];continue;}
if(h===64){const t=S[a-1];if(t&~255)return g(6);S[a-1]=M[t];continue;}
if(h===65){const t=S[a-1],v=S[a-2];if(t&~255)return g(6);a-=2;M[t]=v;continue;}
if(h===80){const t=Buffer.from(S[a-1]+'');if(c+t.length>65536)return g(11);a--;U.set(t,c);c+=t.length;continue;}
if(h===81){if(c+1>65536)return g(11);U[c++]=S[--a]&255;continue;}
if(h===82){S[a++]=d<q.length?q[d++]:-1;continue;}
return g(S[--a]&255);
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of B(I).sort()){
const r=run(C(I+'/'+d+'/program.bin'),C(I+'/'+d+'/input.bin')),o=O+'/'+d;
A(o,{recursive:true});
D(o+'/stdout.bin',r.out);
D(o+'/exit.txt',r.code+'\n');
}
