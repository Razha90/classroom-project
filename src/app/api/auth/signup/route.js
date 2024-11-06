// import { DefinitionSignup } from "@/lib/definitionSignup";


// export const POST = async (req) => {
//   const  form  = await req.formData();
//   const validation = DefinitionSignup.required({
//     email: form.get('email'),
//     // password: form.get('password'),
//   })
//   if (validation.error) {
//     return Response.error(validation.error);
//   }
//   // const { email } = validation.data;
//   return Response.json( form.get('email') );
//   // const validation = DefinitionSignup.required({
//   //   email: form.get('email'),
//   //   password: form.get('password'),
//   // });
//   // if (validation.error) {
//   //   return Response.error(validation.error);
//   // }
//   // const { email, password } = validation.data;
//   // return Response.json({ email, password });
// }

import { DefinitionSignup } from "@/lib/definitionSignup";

export const POST = async (req) => {
  const form = await req.formData();
  const validation = DefinitionSignup.safeParse({
    email: form.get('email'),
    password: form.get('password'),
  });

  if (!validation.success) {
    return new Response(JSON.stringify({
      "status": "error",
      "message": validation.error.errors[0].message,
      "errors": validation.error.errors,
    }), { status: 400 });
  }

  // Akses data tervalidasi
  const { email,password } = validation.data;
  return new Response(JSON.stringify({ email,password }), { status: 200 });
};

export const GET = async (req) => {
  const origin = req.headers.get('Access-Control-Allow-Origin');
  console.log(origin);
  return new Response(JSON.stringify({ data: origin }), { status: 200 });

};