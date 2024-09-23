import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons";

const { faPencil, faFile, faPenToSquare, faComment } = icons;

export const formatVietnameseToString = (param) => {
  return param
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};

export const getNumberPrices = (string) => {
  return string
    .split(" ")
    .map((el) => +el)
    .filter((el) => !el === false);
};

export const getNumberAreas = (string) => {
  return string
    .split(" ")
    .map((el) => +el.match(/\d+/))
    .filter((el) => +el !== 0);
};

export const getCodePrice = (totals, min, max) => {
  return totals?.map((item) => {
    let arrMaxMin = getNumberPrices(item.value);

    return {
      ...item,
      min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0],
      max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 999999999 : arrMaxMin[0]
    };
  });
};

export const getCodeAreas = (totals, min, max) => {
  return totals?.map((item) => {
    let arrMaxMin = getNumberAreas(item.value);

    return {
      ...item,
      min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0],
      max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 999999999 : arrMaxMin[0]
    };
  });
};

export const getPriceCodes = (number, prices, min, max) => {
  const pricesWithMinMax = getCodePrice(prices, min, max);
  return pricesWithMinMax.filter(el => el.min <= number && number < el.max)
};

export const getAreaCodes = (number, areas, min, max) => {
  const areasWithMinMax = getCodeAreas(areas, min, max);
  return areasWithMinMax.filter(el => el.min <= number && number < el.max)
};

export const menu = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
  },
  {
    id: 3,
    text: "Thông tin tài khoản",
    path: "/he-thong/thong-tin-tai-khoan",
  },
];

export const menuSidebar = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <FontAwesomeIcon icon={faPencil} />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <FontAwesomeIcon icon={faFile} />,
  },
  {
    id: 3,
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <FontAwesomeIcon icon={faPenToSquare} />,
  },
  {
    id: 5,
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <FontAwesomeIcon icon={faPenToSquare} />,
  },
  {
    id: 6,
    text: "Liên hệ",
    path: "/he-thong/lien-he",
    icon: <FontAwesomeIcon icon={faComment} />,
  },
];

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  let fields = Object.entries(payload);
  fields.forEach(el => {
    if(el[1] === ""){
      setInvalidFields(prev => [...prev, {
        name: el[0],
        message: "Bạn không được bỏ trống trường này"
      }])
      invalids++;
    }
  })

  fields.forEach(el => {
    switch(el[0]){
      case 'priceNumber':
      case 'areaNumber': 
        if(+el[1]===0){
          setInvalidFields(prev => [...prev, {
            name: el[0],
            message: "Chưa đặt giá trị cho trường này"
          }])
          invalids++;
        }
        else if(!+el[1]){
          setInvalidFields(prev => [...prev, {
            name: el[0],
            message: "Trường này là số"
          }])
          invalids++;
        }
        break

      default:
        break;
    }
  })

  return invalids
}