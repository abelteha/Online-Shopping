import{n as o,e as c,c as d,A as i,R as u,r as l,a as m,j as t,L as p}from"./index.31036f5b.js";import{u as h,c as x,a as g,b}from"./useBlocker.8880154f.js";import{S as E}from"./SmallLoader.eee8d13f.js";const N=()=>{o();const s=c(r=>r.authReducer),a=d(),e=h({initialValues:{resetEmail:""},validationSchema:x({resetEmail:g().email("Invalid Email!").required("email is required!")}),onSubmit:(r,{setSubmitting:f})=>{a(i(!1)),a(u({requestType:"PASSWORD_RESET",email:r.resetEmail}))}});l.exports.useEffect(()=>{e.submitCount>0&&s.isEditing},[s.isEditing]),l.exports.useEffect(()=>{e.dirty&&e.submitCount===0&&a(i(!0))},[e.dirty]);const n=e.touched.resetEmail&&e.errors.resetEmail;return b("are you sure you want to leave this page?,",s.isEditing),m("div",{className:"bg-gray-100 p-5 py-10 sm:p-10 max-w-[30rem] mx-auto mt-[5rem] rounded-lg animate-slideup",children:[t("h1",{className:"text-[#a75b29] text-2xl font-bold text-center mb-4",children:"Reset password"}),m("form",{onSubmit:e.handleSubmit,className:"text-center",children:[t("input",{type:"text",name:"resetEmail",id:"resetEmail",placeholder:"reset email",value:e.values.resetEmail,onBlur:e.handleBlur,onChange:e.handleChange,className:"block h-[3rem] w-full border rounded-lg pl-4 my-4 text-sm sm:text-base outline-[#a75b29]"}),n&&t("p",{className:"text-red-600 text-center",children:e.errors.resetEmail}),t("div",{children:t("button",{type:"submit",className:"border-none px-5 py-2 hover:bg-[#a75b29] bg-[#C56E33] text-white rounded-lg w-[10rem] mt-4 mr-4",onClick:()=>{},children:"Reset"})})]}),t(p,{to:"/signin",children:t("p",{className:"text-center mt-4 text-gray-400 hover:text-[#C56E33]",children:"back to signin page?"})}),s.isLoading&&t(E,{}),s.error&&t("p",{className:"text-red-600 text-center mt-2",children:s.error}),s.success&&t("p",{className:"text-green-500 text-center mt-2",children:"success!"})]})};export{N as default};
