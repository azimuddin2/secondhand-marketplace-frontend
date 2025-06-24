'use client';

import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import NMImageUploader from '@/components/ui/core/SMImageUploader';
import ImagePreviewer from '@/components/ui/core/SMImageUploader/ImagePreviewer';
import { useUser } from '@/context/UserContext';
import { updateListing } from '@/services/Listing';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { IListing } from '@/types';

const UpdateListingForm = ({ listing }: { listing: IListing }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(
    listing?.images || [],
  );
  const [uploading, setUploading] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: listing?.title,
      price: listing?.price,
      condition: listing?.condition,
      status: listing?.status,
      description: listing?.description,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Function to upload images to ImgBB
  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];

    setUploading(true);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const uploadPromises = imageFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', apiKey || '');

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data?.data?.url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    setUploading(false);
    return uploadedUrls;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const uploadedImageUrls = await uploadImages();
      data.images = uploadedImageUrls;

      const modifiedData = {
        ...data,
        price: parseFloat(data.price),
        userID: user?.userId,
        email: user?.email,
      };

      const res = await updateListing(listing._id, modifiedData);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        router.push('/user/listings');
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl flex-grow max-w-3xl p-4 lg:p-5">
      <div className="flex items-center space-x-4 border-b mb-4 pb-3">
        <Image src={logo} alt="Logo" width="50" height="50" />
        <div>
          <h1 className="text-2xl font-semibold">Update Listing</h1>
          <p className="font-extralight text-sm text-gray-700">
            Today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-b py-3 my-5">
            <p className="text-primary font-semibold text-xl">
              Basic Information
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-semibold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-full lg:w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="mt-5 w-full cursor-pointer"
            disabled={isSubmitting || uploading}
          >
            {uploading
              ? 'Uploading Images...'
              : isSubmitting
                ? 'Updating Listing...'
                : 'Update Listing'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateListingForm;
