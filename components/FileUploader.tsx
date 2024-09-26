'use client'

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
  files?:File[] | undefined,
  onChange:(files:File[])=>void
}

const FileUploader=({files,onChange}:FileUploaderProps)=> {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />

      {
        files && files?.length > 0 ? (
          <Image
          src={convertFileToUrl(files[0])}
          alt='preview image'
          width={1000}
          height={1000}
          className='max-h-[200px] object-cover overflow-hidden'
          />
        )
        :
        (
         <>
         <Image
         src='/assets/icons/upload.svg'
         alt='upload'
         width={40}
         height={40}
         />
         <div className="file-upload_label">
          <p className="text-14_regular">
            <span className="text-green-500">
              Click to upload
            </span> or drag and drop
          </p>
          <p>SVG,PNG,JPG and GIF (max 400 x 800px)</p>
         </div>
         </>
        )

      }
     
    </div>
  )
}

export default FileUploader
