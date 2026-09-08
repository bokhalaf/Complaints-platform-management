export function handleApiError(error, setError) {
  let message = "حدث خطأ غير متوقع";

  if (error.status !== undefined) {
    switch (error.status) {
      // case 400:
      //   message = "400 : طلب غير صالح";
      //   break;

      // case 401:
      //   message = "401 : غير مصرح لك بالدخول";
      //   alert(message);
      //   break;

      // case 402:
      //   message = "402 : الدفع مطلوب";
      //   alert(message);
      //   break;

      // case 403:
      //   message = "403 : لا تملك صلاحية الوصول";
      //   break;

      // case 404:
      //   message = "404 : المورد غير موجود";
      //   break;

      // case 500:
      //   message = "500 : خطأ في الخادم";
      //   break;

      default:
        message = `${error.status} : ${error.message}`;
    }

    setError(message);
  } else {
    console.error(error);
    setError(message);
  }
}

