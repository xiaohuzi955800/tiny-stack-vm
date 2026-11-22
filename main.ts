// Tiny stack VM for make.fun tiny-stack-vm-01. From ISA.md; kit vm.mjs is the arbiter.
import{readFileSync as R,readdirSync as D,mkdirSync as M,writeFileSync as W}from'node:fs';
import{join as J}from'node:path';
const T={},P=(a,v)=>a.forEach(o=>T[o]=v);
P([0,52],[0,0,0]);P([1],[1,0,1]);P([2],[4,0,1]);P([3,80,81,83],[0,1,0]);P([4],[0,1,2]);P([5],[0,2,2]);P([6],[0,2,3]);P([7],[0,3,3]);P([16,17,18,19,20,21,22,24,25,26,28,29,30,32,33,34],[0,2,1]);P([23,27,64],[0,1,1]);P([48,51],[2,0,0]);P([49,50],[2,1,0]);P([65],[0,2,0]);P([82],[0,0,1]);

function run(P_,I){
const n=P_.length,S=new Int32Array(256),C=new Int32Array(64),Mm=new Int32Array(256),O=new Uint8Array(65536);
let s=0,c=0,l=0,i=0,p=0,t=0;
const e=x=>[O.subarray(0,l),x];
for(;;){
if(t===1e6)return e(10);
if(p<0||p>=n)return e(9);
const o=P_[p],g=T[o];
if(g===undefined)return e(5);
const[im,po,pu]=g;
if(p+im>=n)return e(9);
t++;
const q=p+1+im;
if(s<po)return e(2);
if(s-po+pu>256)return e(3);
p=q;
switch(o){
case 0:return e(0);
case 1:S[s++]=(P_[q-1]<<24)>>24;break;
case 2:S[s++]=P_[q-4]|P_[q-3]<<8|P_[q-2]<<16|P_[q-1]<<24;break;
case 3:s--;break;
case 4:S[s]=S[s-1];s++;break;
case 5:{const x=S[s-1];S[s-1]=S[s-2];S[s-2]=x;break;}
case 6:S[s]=S[s-2];s++;break;
case 7:{const a=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=a;break;}
case 23:S[s-1]=-S[s-1]|0;break;
case 27:S[s-1]=~S[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const y=S[s-1],a=S[s-2];let r;
if(o===16)r=a+y|0;else if(o===17)r=a-y|0;else if(o===18)r=Math.imul(a,y);
else if(o===19){if(!y)return e(4);r=a===-2147483648&&y===-1?a:a/y|0;}
else if(o===20){if(!y)return e(4);r=y===-1?0:a%y|0;}
else if(o===21){if(!y)return e(4);r=Math.floor((a>>>0)/(y>>>0))|0;}
else if(o===22){if(!y)return e(4);r=(a>>>0)%(y>>>0)|0;}
else if(o===24)r=a&y;else if(o===25)r=a|y;else if(o===26)r=a^y;
else if(o===28)r=a<<(y&31);else if(o===29)r=a>>(y&31);else if(o===30)r=a>>>(y&31)|0;
else if(o===32)r=a===y?1:0;else if(o===33)r=a<y?1:0;else r=(a>>>0)<(y>>>0)?1:0;
s-=2;S[s++]=r;break;}
case 48:case 49:case 50:{
const f=(P_[q-2]|P_[q-1]<<8)<<16>>16;let k=1;
if(o!==48){const v=S[--s];k=o===49?v===0:v!==0;}
if(k)p=q+f;break;}
case 51:if(c===64)return e(7);C[c++]=q;p=P_[q-2]|P_[q-1]<<8;break;
case 52:if(!c)return e(8);p=C[--c];break;
case 64:{const a=S[s-1];if(a<0||a>255)return e(6);S[s-1]=Mm[a];break;}
case 65:{const a=S[s-1];if(a<0||a>255)return e(6);Mm[a]=S[s-2];s-=2;break;}
case 80:{const h=String(S[s-1]);if(l+h.length>65536)return e(11);s--;for(let k=0;k<h.length;k++)O[l++]=h.charCodeAt(k);break;}
case 81:if(l+1>65536)return e(11);O[l++]=S[--s]&255;break;
case 82:S[s++]=i<I.length?I[i++]:-1;break;
case 83:return e(S[--s]&255);
}}}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of D(I).sort()){const[o,x]=run(R(J(I,id,'program.bin')),R(J(I,id,'input.bin')));M(J(O,id),{recursive:true});W(J(O,id,'stdout.bin'),o);W(J(O,id,'exit.txt'),x+'\n');}
