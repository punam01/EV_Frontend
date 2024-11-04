import emailjs from 'emailjs-com';

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'TH';
    switch (day % 10) {
      case 1: return 'ST';
      case 2: return 'ND';
      case 3: return 'RD';
      default: return 'TH';
    }
  };

  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY',
    'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const suffix = getDaySuffix(day);

  return `${day}${suffix} ${month} ${year}`;
};

const formatTime = (dateString, use24HourFormat = false) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();

  if (!use24HourFormat) {
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  } else {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
};

const createTemplateParams = (response) => {
  const bookingData=JSON.parse(localStorage.getItem("bookingData"));
  return {
    to_name: 'Customer',
    to_email: response.contact,
    bookingId: response._id.slice(-10),
    carModel: 'Phoenix',
    date: formatDate(response.bookingTime),
    time: formatTime(response.bookingTime),
    //address: `${response.location.address}, ${response.location.city}, ${response.location.state}, ${response.location.pincode || "400020"}`,
    exteriorColor: bookingData.customization.exteriorColor.value,
    interiorColor: bookingData.customization.interiorColor.value,
    wheel: bookingData.customization.wheelColor.value,
    glass: bookingData.customization.glass.value || "Tinted Glass",
    range: bookingData?.customization?.range?.value ? response?.customization?.range?.value:"Long Range",
    estimatedPrice:bookingData?.estimatedPrice
  };
};

const sendEmail = async (response) => {
  const templateParams = createTemplateParams(response);
  console.log(response);
  try {
    const response = await emailjs.send('service_5qfsdxa', 'template_e4p9166', templateParams, 'qVtlGMpfckPpBoe7-');
    console.log('Email sent successfully:', response);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email. Please try again later.' };
  }
};

export { sendEmail };
