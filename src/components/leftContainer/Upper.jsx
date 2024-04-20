import React, { useState } from 'react'
import Button from '../Button'

const Upper = ({classname,...props}) => {

const [option, setOption] = useState(false)
  const optionsToggle = () =>{
    setOption(!option)
  }

  return (
    <div>
        <div className={`flex justify-between align-middle gap-2 ${classname}`}>
            <div className='flex flex-col justify-center  align-middle'>
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIsA4QMBIgACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAABgcIAQMFBAL/xAA8EAACAQMCAgUJBQcFAAAAAAAAAQIDBAUGEQchEjFBYXETFlFWYoGRlNEUIkKhsRUjUlOCksEIQ3Kywv/EABgBAQEBAQEAAAAAAAAAAAAAAAADAgEE/8QAGxEBAQEBAQEBAQAAAAAAAAAAAAECEUExAyL/2gAMAwEAAhEDEQA/ALxAAAAAAAAAAAAAADpurmhZ29S4u61OjQpRcqlSpJRjFLrbb6gO4FQ6q432VpWnbabsvtzjundVpOFPf2Y7byXw95X99xa1ndzco5KnbR35Qt7eCS/uTf5mpi1m6kaeBl6z4r60tZqTyyrrtjXt6bT+CT/MnWmeOdKpUhQ1Nj1QT5O7tN5RXjB80vBvwFxYTUq5wfNjshaZOzp3mPuaVzbVVvCrSlvFn0mWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAB13Fanb0KlevONOlTi5znJ7KMVzbZmXiZxAudX387e1qTpYajP9zS5ryzX45r9F2eJZXH7UVTH4C2w1tPo1cjNuq1/Jj1r3txXhuZ9KYz6nvXgACqYAAJVoDW19o3JqrSc62PqyX2m135SX8UfRNent6n3ajxt/bZOwt76xqqrbXEFUpzXamYyLu/09ahnOnf6euJ7xpL7Tap9aTe014buL/qZPefVMXxdAAJKAAAAAAAAAAAAAAAAAAAAAAAAAAAzjx9uZVtdQot/doWVOMV6N3Jv9UVuWVx/tJ0Nb0rhp9C4soOL74uSf+CtS+fiOvoADTIAABNODd1K14i4ro9VbylKXg4Sf6pELJtwYs5XfEXGuO+1vGpWk12JQa/WSM6+O5+tQAAguAAAAAAAAAAAAAAAAAAAAAAAAAACsuO+nJ5XTFPKWtPp3GMk5zSXN0Wvv/DZPwTM7G1JxjOEoTipRktpRa3TRnDinw4udNXlXJ4qjKrhasul91bu1b/DL2fQ+zqffTGvGN59V0ACqQAABe3+n3TdS2sbvUN1DZ3aVG13XPoRb6UvBvZf095X/AA34f3msL2FevGdDDU5/vrjq8rt1wh6X6X2eJpqztaFla0rW0pQo0KMFCnTgtlGKXJIlvXimM+u4AE1AAAAAAAAAAAAAAAAAAAAAAAAAAdoA/M4RqQlCcVKMltKLW6a7yA644qYbTM52dqv2jko8nSpSShTfty7PBbspzI8UtX32QheRyjtVTlvToW8Eqce5p79L37mpm1m6kWrqngxgsrVncYerPFXEufk6cVKg3/w7Pc0u4gN7wT1VQqNW1THXMOyUazi/g4nvYDjrKMFT1FiZTkuuvYtc/GEn/wCiaWXFvRl1FOWTnbvbnGvQnHb8mjv9Rzmaqq14K6trTSrPH28e2U7hy29yiTnTHBLEWFSFfO3U8lVjz8jFeTo796638du4kF1xX0Xbw6Sy/lu6jQnJ/oRDO8drWNOUMBia1Sp2Vb1qEV39GLbfxQ7qu8zFwW9vRtaEKFtShSo010YU6cVGMV6EkdpltcUdYLKvIftZ9Jvnb+Tj5Ho+jof56+8tTRHGHGZmpTss7CONvZ7KNTpfuKj8Xzi+5/E5c2E1KtAHCkmk1zT7UcmWgAAAAAAAAAAAAAAAAAAAAAAOGAlJRi22kkt232FEcT+K9W8qVsPpa4dO1jvCvf05c6vpjTfZH2lzfZy5v7uN2vZU3U0vh6rUml9vrQlzS/lJ/wDb4drKTKYz7U9a8jhLbkjkAqmAAAAAAAAsjhnxPutNzo4zMzncYdtRjJ852q7u1x9nsXV6DRNrc0Ly2p3NrWhWoVYqdOpTknGUX1NP0GLi0uDGvZYa+hgMrVf7Oup7W9ScuVvUfZz/AAy/J+LJ7z7FM68rQgODkkoAAAAAAAAAAAAAAAAAAARziBqWGldL3WS+67jbydtB/iqy6vcut9yJGZ74/wCed7qS2w1KT8jj6fSqJPk6s9n+UUv7mdzO1y3kVhXrVbivVr16kqlarNzqTk+cpN7tvxZ+AD0IAAAAAAAAAAAHDW62fUcgDTnCDVktTaYjC7qdPI2LVGu31zX4Z+9dfemTozDwbzrwmuLWE5NW+QX2Wqt+W8nvB/3JL+pmniGpyrZvYAAy0AAAAAAAAAAAAAAAA4lJRi5SeyS3bMd6kyMsvqHJZGcnL7Tc1KkX7Lk+ivctka/vaUq1nXpU3tOdOUYv0Noxre2VxjbytY3tKVK5oScKlOS2aaKfn9Y38dIAKpAAAAAAAAAAAAAD9U6tSjUhVoycatOSnCS7JJ7p/E2Rhr6GTxFlf09uhc0IVVt7STMbQjKpUjThFznNqMYxW7k31JLtZrnQ9hcYvR+Hsb1dG4oWkIVI/wAL26vd1Ev0Uw9wAE1AAAAAAAAAAAAAAAAA83KYDD5dp5XF2d3JLZSr0Iza97R6QAjnmHpL1cxny0foPMPSXq5jPlo/QkYO9ojnmHpL1cxny0foPMPSXq5jPlo/QkYHaI55h6S9XMZ8tH6DzD0l6uYz5aP0JGB2iOeYekvVzGfLR+g8w9JermM+Wj9CRgdojnmHpL1cxny0foPMPSXq5jPlo/QkYHaI55h6S9XMZ8tH6DzD0l6uYz5aP0JGB2jycbpjA4qr5XG4ewtaq/3KVvGMvjtuesAcAAAAAAAAAAAf/9k="
            className='rounded-full h-10'
            alt="" />
            <p className='text-center'>Bibek</p>
            </div>
            <div className='relative'>
            <button className="bg-red-700 h-fit p-1 self-center	rounded-xl w-16 text-center text-white" onClick={optionsToggle}>{option?"Option":"Close"}</button>
            <ol className={`${option?"hidden":"block"} absolute bg-slate-400 -bottom-16 py-2 px-2 rounded-md flex flex-col gap-2`}>
              <li><button className='p-1 bg-slate-300 px-3 rounded w-full hover:bg-slate-200'>logout</button></li>
              <li><button className='p-1 bg-slate-300 px-3 rounded hover:bg-slate-200'>settings</button></li>
            </ol>
            </div>
        </div>
    </div>
  )
}

export default Upper