import { PageTransition } from "@/components/page-transition";
import { useGetFileStats, useListFiles, useDeleteFile, getGetFileStatsQueryKey, getListFilesQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Trash2, PieChart, Activity, HardDrive } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useGetFileStats();
  const { data: filesData, isLoading: filesLoading } = useListFiles({ limit: 50 });
  const deleteFile = useDeleteFile();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDelete = (id: number) => {
    deleteFile.mutate({ fileId: id }, {
      onSuccess: () => {
        toast({ title: "File record deleted" });
        queryClient.invalidateQueries({ queryKey: getListFilesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetFileStatsQueryKey() });
      },
      onError: (err) => {
        toast({ title: "Failed to delete", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <PageTransition className="container mx-auto p-4 md:p-8 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your PDF processing activities.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files Processed</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{stats?.totalFiles || 0}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Data Processed</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{formatBytes(stats?.totalSizeBytes || 0)}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used Tool</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold capitalize">
                {stats?.byOperation && Object.keys(stats.byOperation).length > 0
                  ? Object.entries(stats.byOperation).sort((a, b) => b[1] - a[1])[0][0]
                  : "None yet"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recently processed files and operations.</CardDescription>
        </CardHeader>
        <CardContent>
          {filesLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : !filesData?.files?.length ? (
            <div className="text-center py-10 text-muted-foreground flex flex-col items-center">
              <FileText className="h-10 w-10 mb-2 opacity-20" />
              <p>No activity yet.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Operation</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filesData.files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium truncate max-w-[200px]" title={file.originalName}>
                        {file.originalName}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize bg-primary/10 text-primary">
                          {file.operation}
                        </span>
                      </TableCell>
                      <TableCell>{formatBytes(file.fileSizeBytes)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(file.id)}
                          disabled={deleteFile.isPending}
                          data-testid={`btn-delete-${file.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </PageTransition>
  );
}
