import Image, { ImageProps } from 'next/image';
import React from 'react';

type ImageSize = 'thumbnail' | 'list' | 'full';

interface CloudinaryImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string; // The original Cloudinary URL
  size?: ImageSize;
}

// Maps our semantic sizes to optimized pixel widths
const SIZE_MAP: Record<ImageSize, number> = {
  thumbnail: 400,
  list: 800,
  full: 1200,
};

/**
 * Custom loader for Next.js Image component to use Cloudinary transformations
 * It injects f_auto (format auto) and q_auto (quality auto) for maximum optimization
 * alongside the dynamic width.
 */
const cloudinaryLoader = ({ src, width }: { src: string; width: number }) => {
  // If the image is not from cloudinary, return as is
  if (!src.includes('res.cloudinary.com')) {
    return src;
  }

  // Cloudinary URLs typically have this format:
  // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>
  
  // We want to insert our transformation parameters right after 'upload/'
  const uploadIndex = src.indexOf('/upload/');
  
  if (uploadIndex === -1) {
    return src; // Safely return original if format is unexpected
  }

  // The base transform we ALWAYS want: auto format (WebP/AVIF) and auto quality
  const autoTransform = 'f_auto,q_auto';
  
  // Add width limiting
  const resizeTransform = `w_${width},c_limit`;
  
  // Combine transformations
  const transformations = `${autoTransform},${resizeTransform}`;

  const beforeUpload = src.substring(0, uploadIndex + 8); // +8 for '/upload/'
  const afterUpload = src.substring(uploadIndex + 8);

  // If there's already a transformation in the URL (e.g., /upload/c_fill,w_500/v123...), 
  // we would ideally merge them, but for simplicity and safety, we inject ours before the existing path.
  return `${beforeUpload}${transformations}/${afterUpload}`;
};

/**
 * CloudinaryImage Component
 * 
 * An optimized image component that acts as a wrapper around Next.js <Image>.
 * - Automatically applies `f_auto` and `q_auto` to Cloudinary URLs.
 * - Restricts sizes to standard variations to save bandwidth.
 * - Leverages Next.js native lazy-loading and SEO optimization.
 */
export default function CloudinaryImage({ 
  src, 
  size = 'list', 
  alt, 
  ...props 
}: CloudinaryImageProps) {
  
  const targetWidth = SIZE_MAP[size];

  return (
    <Image
      loader={cloudinaryLoader}
      src={src}
      alt={alt || "Imagem do imóvel"}
      loading={props.priority ? "eager" : "lazy"}
      // Required props for Next Image when not using statically imported images:
      // We pass the dimensions if provided, otherwise we rely on 'fill' or Next.js sizing mechanisms.
      // If width and height are not provided by the parent via `fill`, we set a default aspect ratio.
      width={props.fill ? undefined : targetWidth}
      height={props.fill ? undefined : Math.round(targetWidth * 0.66)} // Assuming 3:2 ratio by default
      {...props}
    />
  );
}
